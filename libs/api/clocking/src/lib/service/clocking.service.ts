import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  AddClockInInput,
  AddClockInRs,
  AddClockOffInput,
  JobStatus,
} from '@dfobobcat/graphql-types';
import { User, Job, ClockIn, ClockOff, Equipment } from '@dfobobcat/api/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import * as tmp from 'tmp';
import { ConfigService } from '@nestjs/config';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { getTodayStart, getRandomString } from '@dfobobcat/api/shared/tool';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import {
  ClockingCommonService,
  TimeZoneService,
} from '@dfobobcat/api/shared/service';
import { UserError } from '@dfobobcat/api/shared/exception';
import { Role } from '@dfobobcat/api/shared/const';
import { ProcessedImage } from '../model/processed-image';
@Injectable()
export class ClockingService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ClockIn)
    private clockInRepository: Repository<ClockIn>,
    @InjectRepository(ClockOff)
    private clockOffRepository: Repository<ClockOff>,
    @InjectQueue('image') private imageQueue: Queue,
    private config: ConfigService,
    private clockingCommonService: ClockingCommonService,
    private tzService: TimeZoneService,
  ) {}

  async hasClockedInToJob(jobId: number, userId: number): Promise<boolean> {
    const hasClockedIn = !!(await this.clockInRepository
      .createQueryBuilder('clockIn')
      .innerJoin('clockIn.job', 'job', 'job.id = :jobId', {
        jobId,
      })
      .innerJoin('clockIn.staff', 'staff', 'staff.id = :staffId', {
        staffId: userId,
      })
      .getOne());

    return hasClockedIn;
  }

  async addClockIn(ctx: any, args: AddClockInInput): Promise<AddClockInRs> {
    const user = ctx.getUser();
    const staffId = user.id;
    const { jobId, ...clockData } = args;
    const userRecord = await this.usersRepository.findOne(user.id);
    const clockInTime = new Date().toISOString();

    const jobToAssign = await this.jobsRepository.findOne(jobId, {
      relations: ['staff', 'activity'],
    });

    const meAssigned =
      jobToAssign && jobToAssign?.staff.some((person) => person.id === user.id);

    const jobIsActive =
      jobToAssign &&
      (jobToAssign.status == JobStatus.Assigned ||
        jobToAssign?.status == JobStatus.InProgress);

    const hasClockedIn = !!(await this.clockInRepository
      .createQueryBuilder('clockIn')
      .innerJoin('clockIn.job', 'job', 'job.id = :jobId', {
        jobId,
      })
      .innerJoin('clockIn.staff', 'staff', 'staff.id = :staffId', {
        staffId,
      })
      .getOne());
    const hasClockedOff = !!(await this.clockOffRepository
      .createQueryBuilder('clockIn')
      .innerJoin('clockIn.job', 'job', 'job.id = :jobId', {
        jobId,
      })
      .innerJoin('clockIn.staff', 'staff', 'staff.id = :staffId', {
        staffId,
      })
      .getOne());

    if (!meAssigned || !jobIsActive || hasClockedIn || hasClockedOff) {
      throw new UserError('You cannot clock in to this job!');
    }

    const clockIn = this.clockInRepository.create({
      job: jobToAssign,
      staff: userRecord,
      clockInTime,
      ...clockData,
    });
    await this.clockInRepository.save(clockIn);

    const nowTime = new Date();
    const images = [];
    const data = await Promise.all(args.files);
    const folder = join(
      this.config.get('UPLOADS_PATH') as string,
      'clock-in',
      `${clockIn.id}`,
    );
    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true });
    }

    for (const file of data) {
      const { mimetype, createReadStream } = file;
      // const ext = filename.split('.').pop();
      const ext = 'png';
      const saveAs = `${getRandomString()}.${ext}`;
      const tmpFile = `_${getRandomString()}.${ext}`;

      const filePath = join(folder, saveAs);
      const tmpFilePath = join(folder, tmpFile);

      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(mimetype)) {
        throw new UserError('Allowed file types: *.jpg, *.png');
      }

      const writeStreamTmpFile = createWriteStream(tmpFilePath);
      const readStream = createReadStream();
      readStream.pipe(writeStreamTmpFile);
      readStream.on('end', () => {
        writeStreamTmpFile.end();
        this.imageQueue.add('save-image-with-timestamp', {
          tmpFilePath,
          savePath: filePath,
          addText: this.tzService.convertToTZ(nowTime, true),
        } as ProcessedImage);
      });

      images.push(saveAs);
    }

    await this.clockInRepository.update(clockIn.id, { images });

    if (jobToAssign?.status === JobStatus.Assigned) {
      jobToAssign.status = JobStatus.InProgress;
      jobToAssign.activity.push({
        type: JobStatus.InProgress,
        date: new Date(),
      });
      await this.jobsRepository.save(jobToAssign);
    }

    /**
     * DO not get the equipment by doing joins in the queries above. It does not work.
     */
    const jobEquipment = await this.jobsRepository
      .createQueryBuilder('job')
      .where('job.id = :jobId', { jobId: jobToAssign?.id })
      .leftJoinAndSelect('job.equipment', 'equipment')
      .select(['job.id', 'equipment.id', 'equipment.name'])
      .getOne();

    let equipment: Equipment[] = [];
    if (jobEquipment?.equipment) {
      equipment = jobEquipment.equipment;
    }

    return {
      id: jobToAssign.id,
      address: jobToAssign.address,
      equipment,
    };
  }

  async addClockOff(ctx: any, args: AddClockOffInput) {
    const user = ctx.getUser();

    if (
      user.role === Role.Laborer &&
      (!Array.isArray(args.files) || !args.files.length)
    ) {
      throw new UserError('Cannot clock off without the images.');
    }

    const { jobId, ...clockData } = args;

    const job = await this.jobsRepository.findOneOrFail(
      { id: jobId },
      {
        relations: ['staff', 'activity'],
      },
    );
    const userRecord = await this.usersRepository.findOneOrFail({
      id: user.id,
    });

    const now = getTodayStart();

    const hasClockedOff = await this.clockOffRepository
      .createQueryBuilder('clockOff')
      .innerJoinAndSelect('clockOff.job', 'job')
      .where('clockOff.staff.id = :staffId', { staffId: user.id })
      .andWhere('job.id = :jobId', { jobId: args.jobId })
      .andWhere(
        `DATE(job.requestDate) >= DATE(:now) AND DATE(job.requestDate) < DATE(:now) + INTERVAL '1 DAY'`,
        { now },
      )
      .getOne();

    if (hasClockedOff) {
      throw new UserError('You already clocked off from this job today!');
    }

    /**
     * get todays clock in so that we can
     * calculate time worked for today
     */
    const todaysClockIns = await this.clockInRepository
      .createQueryBuilder('clockIn')
      .innerJoin('clockIn.job', 'job', 'job.id = :jobId', { jobId })
      .innerJoin('clockIn.staff', 'staff', 'staff.id = :staffId', {
        staffId: user.id,
      })
      .where(
        `DATE(job.requestDate) >= DATE(:now) AND DATE(job.requestDate) < DATE(:now) + INTERVAL '1 DAY'`,
        { now },
      )
      .select(['clockIn.id', 'clockIn.clockInTime'])
      .getMany();
    if (!todaysClockIns || !todaysClockIns.length) {
      throw new UserError(
        'Clock off is impossible because clock in does not exist!',
      );
    }
    if (todaysClockIns.length > 1) {
      throw new UserError('Found too many clock ins for one day. Aborting.');
    }
    const todaysClockIn = todaysClockIns[0];

    const nowTime = new Date();
    const clockOffTime = nowTime.toISOString();
    const clockOff = this.clockOffRepository.create({
      job,
      clockOffTime,
      staff: userRecord,
      ...clockData,
    });

    // total time in mins
    const totalTimeWorked = Math.trunc(
      (new Date(clockOffTime).getTime() -
        new Date(todaysClockIn.clockInTime).getTime()) /
        60000,
    );
    const currentTotalTime = clockOff.totalTimeWorked || 0;
    clockOff.totalTimeWorked = currentTotalTime + totalTimeWorked;

    // save first to get id to create folder with id
    await this.clockOffRepository.save(clockOff);
    const clockOffId = clockOff.id;

    const images = [];
    if (Array.isArray(args.files) && args.files.length) {
      const data = await Promise.all(args.files);
      const folder = join(
        this.config.get('UPLOADS_PATH') as string,
        'clock-off',
        `${clockOffId}`,
      );
      if (!existsSync(folder)) {
        mkdirSync(folder, { recursive: true });
      }
      for (const file of data) {
        const { mimetype, createReadStream } = file;
        // const ext = filename.split('.').pop();
        const ext = 'png';
        const saveAs = `${getRandomString()}.${ext}`;
        const tmpFile = `_${getRandomString()}.${ext}`;

        const filePath = join(folder, saveAs);
        const tmpFilePath = join(folder, tmpFile);

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(mimetype)) {
          throw new UserError('Allowed file types: *.jpg, *.png');
        }

        const writeStreamTmpFile = createWriteStream(tmpFilePath);
        const readStream = createReadStream();
        readStream.pipe(writeStreamTmpFile);
        readStream.on('end', () => {
          writeStreamTmpFile.end();
          this.imageQueue.add('save-image-with-timestamp', {
            tmpFilePath,
            savePath: filePath,
            addText: this.tzService.convertToTZ(nowTime, true),
          } as ProcessedImage);
        });

        images.push(saveAs);
      }
    }
    clockOff.images = images;
    await this.clockOffRepository.save(clockOff);

    if (await this.isJobCompleted(job)) {
      job.status = JobStatus.Completed;
      job.activity.push({ type: JobStatus.Completed, date: new Date() });
      await this.jobsRepository.save(job);
    }

    return true;
  }

  // job is completed when all staff clocked off
  async isJobCompleted(job: Job): Promise<boolean> {
    const clockInAmount = await this.clockInRepository
      .createQueryBuilder('clockIn')
      .innerJoinAndSelect('clockIn.job', 'job', 'job.id = :jobId', {
        jobId: job.id,
      })
      .getCount();
    const clockOffAmount = await this.clockOffRepository
      .createQueryBuilder('clockOff')
      .innerJoinAndSelect('clockOff.job', 'job', 'job.id = :jobId', {
        jobId: job.id,
      })
      .getCount();

    const staffAssigned = await this.jobsRepository
      .createQueryBuilder('job')
      .innerJoinAndSelect('job.staff', 'staff')
      .where('job.id = :jobId', { jobId: job.id })
      .getOne();
    const amountStaffAssigned = staffAssigned?.staff.length || 0;
    return (
      clockInAmount === clockOffAmount && clockInAmount === amountStaffAssigned
    );
  }
}
