import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  AssignToJobInput,
  CreateJobInput,
  QueryJobsArgs,
  UpdateJobInput,
  UpdateJobDateInput,
} from '@dfobobcat/graphql-types';
import {
  User,
  Job,
  Equipment,
  ClockOff,
  Activity,
  ClockIn,
} from '@dfobobcat/api/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Claim, Range } from '@dfobobcat/api/shared/const';
import { JobStatus } from '@dfobobcat/graphql-types';
import { defineAbilityFor } from '@dfobobcat/api/auth/util';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync, unlink } from 'fs';
import { BuilderJobService } from './builder-job.service';

import { } from '@dfobobcat/api/shared/tool';

import { UserError } from '@dfobobcat/api/shared/exception';
import {
  getOrderAndDirection,
  getRandomString,
} from '@dfobobcat/api/shared/tool';
import { EmailService, EmailType } from '@dfobobcat/api/email';
import {
  TimeZoneService,
  BuilderUtilService,
} from '@dfobobcat/api/shared/service';
interface PlainJob {
  staff: Array<{
    name: string;
    email: string;
  }>;
  address: string;
  requestDate: Date;
}

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Equipment)
    private equipmentsRepository: Repository<Equipment>,
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(ClockOff)
    private clockOffRepository: Repository<ClockOff>,
    @InjectRepository(ClockIn)
    private clockInRepository: Repository<ClockIn>,
    private config: ConfigService,
    private builderJobService: BuilderJobService,
    private builderUtilService: BuilderUtilService,
    private emailService: EmailService,
    private tzService: TimeZoneService,
  ) { }

  async getJob(jobId: number) {
    const result = await this.jobsRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.equipment', 'equipment')
      .leftJoinAndSelect('job.builder', 'builder')
      .leftJoinAndSelect('job.assigner', 'assigner')
      .leftJoinAndSelect('job.staff', 'staff')
      .where('job.id = :jobId', { jobId })
      .orderBy()
      .getOneOrFail();
    return result;
  }

  public async getJobs(args: QueryJobsArgs) {
    const status = args.status ? args.status : [JobStatus.Assigned];
    const offset = args.pagination?.offset ? args.pagination.offset : 9;
    const page = args.pagination?.page ? args.pagination.page : 0;
    const staffFilter = args?.staff;
    const skip = page * offset;

    const queryIds = this.jobsRepository
      .createQueryBuilder('job')
      .select('job.id');
    if (staffFilter) {
      queryIds.innerJoin(
        'job.staff',
        'staff',
        'staff.id IN (:...staffFilter)',
        {
          staffFilter,
        },
      );
    }

    if (status) {
      queryIds.where('job.status IN (:...status)', { status });
    }
    if (args.filteredDate?.calendarType === Range.Day) {
      queryIds.andWhere(
        `DATE(job.requestDate) >= DATE(:startDate) AND DATE(job.requestDate) <= DATE(:startDate)`,
        { startDate: args.filteredDate?.startDate },
      );
    } else if (args.filteredDate?.calendarType === Range.Week) {
      queryIds.andWhere(
        `DATE(job.requestDate) >= DATE(:startDate) AND DATE(job.requestDate) <= DATE(:endDate)`,
        {
          startDate: args.filteredDate?.startDate,
          endDate: args.filteredDate?.endDate,
        },
      );
    } else if (args.filteredDate?.calendarType === Range.Month) {
      queryIds.andWhere(
        `DATE(job.requestDate) >= DATE(:currentDate) AND DATE(job.requestDate) <= DATE(:endDate)`,
        {
          currentDate: args.filteredDate?.startDate,
          endDate: args.filteredDate?.endDate,
        },
      );
    }

    if (args.search && args.search.length > 0) {
      queryIds.andWhere('LOWER(job.address) like :address', {
        address: `%${args.search.toLowerCase()}%`,
      });
    }

    const query = this.jobsRepository
      .createQueryBuilder('job')
      .where(`job.id IN (${queryIds.getQuery()})`)
      .setParameters(queryIds.getParameters())
      .leftJoinAndSelect('job.equipment', 'equipment')
      .leftJoinAndSelect('job.builder', 'builder')
      .leftJoinAndSelect('job.assigner', 'assigner')
      .leftJoinAndSelect('job.activity', 'activity');

    const totalClone = query.clone();
    const total = await totalClone.getCount();
    const hasNextPage = total > (page + 1) * offset;
    const hasPreviousPage = page > 0;
    const nextPage = hasNextPage ? page + 1 : undefined;
    const previousPage = hasPreviousPage ? page - 1 : undefined;

    let orderBy = getOrderAndDirection(args.orderBy);
    let jobs;
    if (!orderBy) {
      orderBy = ['job.id', 'ASC'];
    }

    if (args.filteredDate) {
      orderBy = ['job.requestDate', 'ASC'];
      jobs = await query.orderBy(...orderBy).getMany();
    } else {
      jobs = await query
        .orderBy(...orderBy)
        .take(offset)
        .skip(skip)
        .getMany();
    }
    return {
      items: jobs,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      },
    };
  }

  async createJob(ctx: any, args: CreateJobInput): Promise<boolean> {
    let builder;
    let activity = [];
    const user = ctx.getUser();
    const {
      address,
      lat,
      lng,
      requestDate,
      notes,
      priority,
      stage,
      adminSelectedBuilder,
      type,
      time,
    } = args;
    const status = JobStatus.Pending;
    const equipment = await this.builderUtilService.findByIdsOrThrow(
      this.equipmentsRepository,
      args.equipment,
    );
    activity.push({ type: status, date: new Date() });
    if (adminSelectedBuilder) {
      builder = await this.usersRepository.findOneOrFail(adminSelectedBuilder, {
        relations: ['token'],
      });
    } else {
      builder = await this.usersRepository.findOneOrFail(user.id, {
        relations: ['token'],
      });
    }
    const job = new Job({
      address,
      lat,
      lng,
      requestDate: requestDate,
      equipment,
      builder,
      status,
      notes,
      priority,
      stage,
      activity,
    });
    await this.jobsRepository.save(job);

    const jobInfo = `${this.tzService.convertToTZ(
      new Date(job.requestDate),
    )} - ${job.address}`;
    const loginEditJobLink = `${this.config.get('LOGIN_EDIT_JOB_LINK')}${job.id
      }?login_token=${builder.token.builderLoginToken}`;
    //send to builder
    this.emailService.sendEmail<EmailType.BUILDER_JOB_CREATED>(
      job.builder.email,
      EmailType.BUILDER_JOB_CREATED,
      {
        jobInfo,
        loginEditJobLink,
        username: job.builder.name,
      },
    );
    // send to admin
    const adminEmail = this.config.get('ADMIN_EMAIL');
    if (adminEmail) {
      this.emailService.sendEmail<EmailType.ADMIN_JOB_CREATED>(
        adminEmail,
        EmailType.ADMIN_JOB_CREATED,
        {
          jobInfo,
          username: job.builder.name,
        },
      );
    }

    let fileName;
    if (args.poFile) {
      const file = args.poFile;
      const { createReadStream, mimetype } = await file;

      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(mimetype)) {
        throw new UserError('Allowed file types: *.pdf');
      }
      const folder = join(
        this.config.get('UPLOADS_PATH') as string,
        'po',
        `${job.id}`,
      );
      try {
        if (!existsSync(folder)) {
          mkdirSync(folder, { recursive: true });
        }
      } catch (err) {
        // TODO: log this
      }
      fileName = `${getRandomString()}.pdf`;
      const poFilePath = join(folder, fileName);
      const writeStream = createWriteStream(poFilePath);
      const readStream = createReadStream();

      // TODO: if error writing file
      readStream.pipe(writeStream);

      job.poFile = fileName;
      await this.jobsRepository.save(job);
    }

    return true;
  }

  async updateJob(ctx: any, args: UpdateJobInput): Promise<boolean> {
    const { address, lat, lng, id, notes, priority } = args;
    const requestDate = new Date(args.requestDate);

    let isReschedule = false;

    const user = ctx.getUser();
    let job = await this.jobsRepository
      .createQueryBuilder('job')
      .innerJoinAndSelect('job.builder', 'builder')
      .leftJoinAndSelect('job.staff', 'staff')
      .where('job.id = :jobId', { jobId: id })
      .getOne();
    if (!job) {
      throw new UserError('Job was not found.');
    }
    const builder = await this.usersRepository.findOneOrFail(
      { id: job.builder.id },
      { relations: ['token'] },
    );
    const ability = defineAbilityFor(ctx);
    if (
      ability.cannot(Claim.UpdateAllJobs) &&
      (!this.isOwnJob(user, job) || ability.cannot(Claim.UpdateOwnJob))
    ) {
      //TODO: log this
      throw new UserError();
    }

    if (args.poFile) {
      const file = args.poFile;
      const { createReadStream, mimetype } = await file;

      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(mimetype)) {
        throw new UserError('Allowed file types: *.pdf');
      }
      const folder = join(
        this.config.get('UPLOADS_PATH') as string,
        'po',
        `${job.id}`,
      );
      try {
        if (!existsSync(folder)) {
          mkdirSync(folder, { recursive: true });
        }
      } catch (err) {
        // TODO: log this
      }

      const fileName = `${getRandomString()}.pdf`;
      const poFilePath = join(folder, fileName);
      const writeStream = createWriteStream(poFilePath);
      const readStream = createReadStream();

      // TODO: if error writing file
      readStream.pipe(writeStream);

      const oldFile = job.poFile;
      if (oldFile && existsSync(join(folder, oldFile))) {
        unlink(join(folder, oldFile), (err) => {
          // TODO: log this
        });
      }

      job.poFile = fileName;
    }

    const equipment = await this.builderUtilService.findByIdsOrThrow(
      this.equipmentsRepository,
      args.equipment,
    );

    if (job.requestDate.toISOString() !== requestDate.toISOString()) {
      isReschedule = true;
    }

    const oldJobData: PlainJob = {
      requestDate: new Date(job.requestDate),
      address: job.address,
      staff: job.staff.map((item) => ({
        name: item.name,
        email: item.email,
      })),
    };
    const updatedActivity: any = job.activity || [];
    updatedActivity.push({ type: 'updated', date: new Date().toISOString() });

    job = {
      ...job,
      address,
      lat,
      lng,
      requestDate: new Date(requestDate),
      equipment,
      reminderSent: false,
      staff: isReschedule ? [] : job.staff,
      status: isReschedule ? JobStatus.Pending : job.status,
      activity: updatedActivity,
      notes,
      priority,
    };
    await this.jobsRepository.save(job);

    if (isReschedule) {
      const oldRequestDate = this.tzService.convertToTZ(oldJobData.requestDate);
      const newRequestDate = this.tzService.convertToTZ(job.requestDate);
      const jobInfo = `${this.tzService.convertToTZ(
        oldJobData.requestDate,
      )} - ${oldJobData.address}`;
      // Send to staff
      for (const staff of oldJobData.staff) {
        this.emailService.sendEmail<EmailType.STAFF_JOB_RESCHEDULED>(
          staff.email,
          EmailType.STAFF_JOB_RESCHEDULED,
          {
            jobAddress: oldJobData.address,
            jobInfo,
            username: staff.name,
            oldRequestDate,
            newRequestDate,
          },
        );
      }
      // Send To builder
      const loginEditJobLink = `${this.config.get('LOGIN_EDIT_JOB_LINK')}${job.id
        }?login_token=${builder.token.builderLoginToken}`;
      this.emailService.sendEmail<EmailType.BUILDER_JOB_RESCHEDULED>(
        job.builder.email,
        EmailType.BUILDER_JOB_RESCHEDULED,
        {
          jobAddress: oldJobData.address,
          loginEditJobLink,
          jobInfo,
          oldRequestDate,
          newRequestDate,
          username: user.name,
        },
      );

      if (this.config.get('ADMIN_EMAIL')) {
        // Send To admin
        this.emailService.sendEmail<EmailType.ADMIN_JOB_RESCHEDULED>(
          this.config.get('ADMIN_EMAIL') as string,
          EmailType.ADMIN_JOB_RESCHEDULED,
          {
            jobAddress: oldJobData.address,
            jobInfo,
            oldRequestDate,
            newRequestDate,
            username: user.name,
          },
        );
      }
    }

    return true;
  }
  async updateJobDate(ctx: any, args: UpdateJobDateInput): Promise<boolean> {
    const { id } = args;
    const requestDate = new Date(args.requestDate);
    let isReschedule = false;
    const user = ctx.getUser();
    let job = await this.jobsRepository
      .createQueryBuilder('job')
      .innerJoinAndSelect('job.builder', 'builder')
      .leftJoinAndSelect('job.staff', 'staff')
      .where('job.id = :jobId', { jobId: id })
      .getOne();
    if (!job) {
      throw new UserError('Job was not found.');
    }
    const builder = await this.usersRepository.findOneOrFail(
      { id: job.builder.id },
      { relations: ['token'] },
    );

    if (job.requestDate.toISOString() !== requestDate.toISOString()) {
      isReschedule = true;
    }
    const oldJobData = {
      requestDate: new Date(job.requestDate),
      address: job.address,
      staff: job.staff.map((item) => ({
        name: item.name,
        email: item.email,
      })),
    };
    const updatedActivity: any = job.activity || [];
    updatedActivity.push({ type: 'updated', date: new Date().toISOString() });

    job = {
      ...job,
      requestDate: new Date(requestDate),
      reminderSent: false,
      staff: isReschedule ? [] : job.staff,
      status: isReschedule ? JobStatus.Pending : job.status,
      activity: updatedActivity,
    };
    await this.jobsRepository.save(job);
    const oldRequestDate = this.tzService.convertToTZ(oldJobData.requestDate);
    const newRequestDate = this.tzService.convertToTZ(job.requestDate);
    const jobInfo = `${this.tzService.convertToTZ(oldJobData.requestDate)} - ${oldJobData.address
      }`;
    // Send to staff
    for (const staff of oldJobData.staff) {
      this.emailService.sendEmail<EmailType.STAFF_JOB_RESCHEDULED>(
        staff.email,
        EmailType.STAFF_JOB_RESCHEDULED,
        {
          jobAddress: oldJobData.address,
          jobInfo,
          username: staff.name,
          oldRequestDate,
          newRequestDate,
        },
      );
    }
    // Send To builder
    if (builder.token?.builderLoginToken) {
      const loginEditJobLink = `${this.config.get('LOGIN_EDIT_JOB_LINK')}${job.id
        }?login_token=${builder.token.builderLoginToken}`;
      this.emailService.sendEmail<EmailType.BUILDER_JOB_RESCHEDULED>(
        job.builder.email,
        EmailType.BUILDER_JOB_RESCHEDULED,
        {
          jobAddress: oldJobData.address,
          loginEditJobLink,
          jobInfo,
          oldRequestDate,
          newRequestDate,
          username: user.name,
        },
      );
    }
    return true;
  }



  async assignToJob(ctx: any, args: AssignToJobInput): Promise<boolean> {
    if (args.staffIds && args.staffIds.length > 3) {
      throw new UserError('Cannot assign more than 3 people.');
    }

    const action = args.staffIds.length > 0 ? 'assign' : 'unassign';

    const { jobId } = args;
    const result: any = await this.jobsRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.activity', 'activity')
      .leftJoinAndSelect('job.builder', 'builder')
      .leftJoinAndSelect('job.staff', 'staff')
      .where('job.id = :jobId', { jobId });

    const job = await result.getOne();
    const staffUsers =
      action === 'assign'
        ? await this.builderUtilService.findByIdsOrThrow(
          this.usersRepository,
          args.staffIds,
        )
        : job.staff;

    const builder = await this.usersRepository.findOne(
      { id: job.builder.id },
      { relations: ['token'] },
    );

    if (!builder) {
      throw new UserError('The job has no builder.');
    }

    if (job.status === JobStatus.Cancelled) {
      throw new UserError('Cannot assign or unassign to cancelled job.');
    }

    job.status =
      action === 'assign' ? JobStatus.Assigned : JobStatus.UnAssigned;
    job.staff = action === 'assign' ? staffUsers : [];

    job.assigner = ctx.getUser();

    if (action === 'assign')
      job.activity.push({ type: JobStatus.Assigned, date: new Date() });
    else job.activity.push({ type: JobStatus.UnAssigned, date: new Date() });


    await this.jobsRepository.save(job);
    const requestDate = this.tzService.convertToTZ(job.requestDate);
    const jobInfo = `${requestDate} - ${job.address}`;
    const jobAddress = job.address;

    const builderNotifyType =
      action === 'assign'
        ? EmailType.BUILDER_JOB_ASSIGNED
        : EmailType.BUILDER_JOB_UNASSIGNED;

    const stafferNotifyType =
      action === 'assign'
        ? EmailType.STAFF_JOB_ASSIGNED
        : EmailType.STAFF_JOB_UNASSIGNED;

    for (const user of staffUsers) {
      this.emailService.sendEmail<typeof stafferNotifyType>(
        user.email,
        stafferNotifyType,
        {
          jobInfo,
          requestDate,
          jobAddress,
          username: user.name,
        },
      );
    }
    if (builder.token?.builderLoginToken) {
      const loginEditJobLink = `${this.config.get('LOGIN_EDIT_JOB_LINK')}${job.id
        }?login_token=${builder.token.builderLoginToken}`;
      this.emailService.sendEmail<EmailType.BUILDER_JOB_ASSIGNED>(
        job.builder.email,
        EmailType.BUILDER_JOB_ASSIGNED,
        {
          jobInfo,
          requestDate,
          loginEditJobLink,
          jobAddress,
          username: builder.name,
        },
      );
    }

    return true;
  }

  async getJobClockOffs(jobId: number) {
    return this.clockOffRepository
      .createQueryBuilder('clockOff')
      .innerJoinAndSelect('clockOff.job', 'job', 'job.id = :jobId', {
        jobId,
      })
      .innerJoinAndSelect('clockOff.staff', 'staff')
      .select([
        'clockOff.id',
        'clockOff.clockOffTime',
        'clockOff.images',
        'clockOff.notes',
        'staff.name',
        'job.address',
      ])
      .getMany();
  }

  async getJobClockIns(jobId: number) {
    return this.clockInRepository
      .createQueryBuilder('clockIn')
      .innerJoinAndSelect('clockIn.job', 'job', 'job.id = :jobId', {
        jobId,
      })
      .innerJoinAndSelect('clockIn.staff', 'staff')
      .select([
        'clockIn.id',
        'clockIn.clockInTime',
        'clockIn.images',
        'staff.name',
        'job.address',
      ])
      .getMany();
  }

  async cancelJob(ctx: any, jobId: number): Promise<boolean> {
    const user = ctx.getUser();
    const job = await this.jobsRepository
      .createQueryBuilder('job')
      .innerJoinAndSelect('job.builder', 'builder')
      .leftJoinAndSelect('job.staff', 'staff')
      .leftJoinAndSelect('job.activity', 'activity')
      .where('job.id = :jobId', { jobId })
      .getOne();
    if (!job) {
      throw new UserError();
    }

    const ability = defineAbilityFor(ctx);
    if (ability.cannot(Claim.CancelAllJobs) && !this.isOwnJob(user, job)) {
      throw new UserError();
    }

    job.status = JobStatus.Cancelled;
    job.activity.push({ type: JobStatus.Cancelled, date: new Date() });
    await this.jobsRepository.save(job);

    const requestDate = this.tzService.convertToTZ(job.requestDate);
    const jobInfo = `${requestDate} - ${job.address}`;
    for (const staffUser of job.staff) {
      this.emailService.sendEmail<EmailType.STAFF_JOB_CANCELLED>(
        staffUser.email,
        EmailType.STAFF_JOB_CANCELLED,
        {
          jobInfo,
          requestDate,
          username: staffUser.name,
        },
      );
    }
    // Send To builder
    this.emailService.sendEmail<EmailType.BUILDER_JOB_CANCELLED>(
      user.email,
      EmailType.BUILDER_JOB_CANCELLED,
      {
        jobInfo,
        requestDate,
        username: user.name,
      },
    );
    // Send To admin
    const adminEmail = this.config.get('ADMIN_EMAIL');
    if (adminEmail) {
      this.emailService.sendEmail<EmailType.ADMIN_JOB_CANCELLED>(
        adminEmail,
        EmailType.ADMIN_JOB_CANCELLED,
        {
          jobInfo,
          requestDate,
          username: user.name,
        },
      );
    }

    return true;
  }

  private isOwnJob(user: User, job: Job): boolean {
    return user.id === job.builder.id;
  }
}
