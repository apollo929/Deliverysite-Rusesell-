import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, Equipment, User, ClockOff } from '@dfobobcat/api/entity';
import {
  JobStatus,
  JobFilter,
  StaffAssignedJobsArgs,
} from '@dfobobcat/graphql-types';
import { getTodayStart } from '@dfobobcat/api/shared/tool';
import { ClockingCommonService } from '@dfobobcat/api/shared/service';

export class StaffJobService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Equipment)
    private equipmentsRepository: Repository<Equipment>,
    @InjectRepository(ClockOff)
    private clockOffRepository: Repository<ClockOff>,
    private config: ConfigService,
    private clockingCommonService: ClockingCommonService,
  ) { }

  async getStaffJobs(userId: number, args: StaffAssignedJobsArgs) {
    let jobs: Job[] = [];
    const filter = args.filter ? args.filter : JobFilter.Upcoming;

    switch (filter) {
      case JobFilter.Upcoming: {
        jobs = await this.getUpcomingJobs(userId, args);
        break;
      }
      case JobFilter.Past: {
        jobs = await this.getPastJobs(userId, args);

        break;
      }
      case JobFilter.Cancelled: {
        jobs = await this.getCancelledJobs(userId, args);

        break;
      }
    }
    // console.log(jobs);
    return jobs;
  }
  private async getUpcomingJobs(
    staffId: number,
    args: StaffAssignedJobsArgs,
  ): Promise<Job[]> {
    const now = getTodayStart();
    const query = this.jobsRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.equipment', 'equipment')
      .leftJoinAndSelect('job.builder', 'builder')  //Bug fixing : Add builder Name
      .innerJoin('job.staff', 'staff', 'staff.id = :staffId', { staffId })
      .where('DATE(job.requestDate) >= DATE(:now)', {
        now,
      })
      .andWhere('job.status IN (:...status)', {
        status: [JobStatus.Assigned, JobStatus.InProgress],
      });

    const todayClockOffs = await this.clockingCommonService.getTodayClockOffs(
      staffId,
    );
    if (todayClockOffs.length) {
      query.andWhere('job.id NOT IN (:...jobsWithClockOffs)', {
        jobsWithClockOffs: todayClockOffs.map((item) => item.job.id),
      });
    }

    if (
      args.search &&
      typeof args.search === 'string' &&
      args.search.length > 0
    ) {
      query.andWhere('LOWER(job.address) like :address', {
        address: `%${args.search.toLowerCase()}%`,
      });
    }
    query
      .select([
        'job.id',
        'job.address',
        'job.lat',
        'job.lng',
        'job.status',
        'job.notes',
        'job.priority',
        'job.requestDate',
        'builder',
        'equipment.name',
        'equipment.id',
      ])
      .orderBy('job.requestDate', 'DESC');   //Bug fixing : Add builder Name

    // console.log('==============================');
    return query.getMany();
  }
  private async getPastJobs(
    staffId: number,
    args: StaffAssignedJobsArgs,
  ): Promise<Job[]> {
    const now = getTodayStart();

    /**
     * return jobs that
     * 1) have status cancelled AND requested in teh past
     * 2) jobs that have clock off for current user
     */

    const jobIdsWithClockOffs = await this.clockingCommonService.getStaffClocksOff(
      staffId,
    );

    const query = this.jobsRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.equipment', 'equipment')
      .leftJoinAndSelect('job.builder', 'builder')
      .innerJoin('job.staff', 'staff', 'staff.id = :staffId', { staffId });

    if (jobIdsWithClockOffs.length) {
      query
        .where('job.id IN (:...jobIdsWithClockOffs)', {
          jobIdsWithClockOffs: jobIdsWithClockOffs.map((item) => item.job.id),
        })
        .orWhere('job.requestDate < :now', {
          now,
        })
        .andWhere('job.status != :status', { status: JobStatus.Cancelled });
    } else {
      query
        .where('job.requestDate < :now', {
          now,
        })
        .andWhere('job.status != :status', { status: JobStatus.Cancelled });
    }

    if (
      args.search &&
      typeof args.search === 'string' &&
      args.search.length > 0
    ) {
      query.andWhere('LOWER(job.address) like :address', {
        address: `%${args.search.toLowerCase()}%`,
      });
    }
    query
      .select([
        'job.id',
        'job.address',
        'job.lat',
        'job.lng',
        'job.notes',
        'job.priority',
        'job.status',
        'job.requestDate',
        'builder',
        'equipment.name',
        'equipment.id',
      ])
      .orderBy('job.requestDate', 'DESC');

    return query.getMany();
  }
  private async getCancelledJobs(
    staffId: number,
    args: StaffAssignedJobsArgs,
  ): Promise<Job[]> {
    const query = this.jobsRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.equipment', 'equipment')
      .leftJoinAndSelect('job.builder', 'builder')
      .innerJoin('job.staff', 'staff', 'staff.id = :staffId', { staffId })
      .where('job.status = :status', { status: JobStatus.Cancelled });
    if (
      args.search &&
      typeof args.search === 'string' &&
      args.search.length > 0
    ) {
      query.andWhere('LOWER(job.address) like :address', {
        address: `%${args.search.toLowerCase()}%`,
      });
    }
    query
      .select([
        'job.id',
        'job.address',
        'job.lat',
        'job.lng',
        'job.notes',
        'job.priority',
        'job.status',
        'job.requestDate',
        'builder',
        'equipment.name',
        'equipment.id',
      ])
      .orderBy('job.requestDate', 'DESC');

    return query.getMany();
  }

  /**
   * Returns job that current staff memeber has clocked in, but haven't clocked out yet
   * @returns Job
   */
  public async getTodaysAssignedJob(staffId: number): Promise<Job | undefined> {
    const now = getTodayStart();
    const job = await this.jobsRepository
      .createQueryBuilder('job')
      .innerJoin('job.staff', 'staff', 'staff.id = :staffId', {
        staffId,
      })
      .innerJoin('job.clockIns', 'clockIns', 'clockIns.staff.id = :staffId', {
        staffId,
      })
      .leftJoinAndSelect(
        'job.clockOffs',
        'clockOffs',
        'clockOffs.staff.id = :staffId',
        {
          staffId,
        },
      )
      .where(
        `DATE(job.requestDate) >= DATE(:now) AND DATE(job.requestDate) < DATE(:now) + INTERVAL '1 DAY'`,
        { now },
      )
      .andWhere('job.status IN (:...status)', {
        status: [JobStatus.Assigned, JobStatus.InProgress],
      })
      .orderBy('job.requestDate', 'DESC')
      .limit(1)
      .getOne();

    /**
     * DO not get the equipment by doing joins in the queries above. It does not work.
     */
    if (job) {
      const equipment = await this.jobsRepository
        .createQueryBuilder('job')
        .where('job.id = :jobId', { jobId: job.id })
        .leftJoinAndSelect('job.equipment', 'equipment')
        .select(['job.id', 'equipment.id', 'equipment.name'])
        .getOne();

      job.equipment = equipment.equipment;
    }

    if (!job || (job.clockOffs && job.clockOffs.length)) {
      return undefined;
    } else {
      return job;
    }
  }
}
