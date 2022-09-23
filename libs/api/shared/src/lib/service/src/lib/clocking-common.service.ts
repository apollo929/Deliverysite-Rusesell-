import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, Equipment, User, ClockOff, ClockIn } from '@dfobobcat/api/entity';

import { getTodayStart } from '@dfobobcat/api/shared/tool';
export class ClockingCommonService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Equipment)
    private equipmentsRepository: Repository<Equipment>,
    @InjectRepository(ClockOff)
    private clockOffRepository: Repository<ClockOff>,
    @InjectRepository(ClockIn)
    private clockInRepository: Repository<ClockIn>,
    private config: ConfigService,
  ) {}

  /**
   * get all clocks off of a staff person
   */
  async getStaffClocksOff(staffId: number) {
    return this.clockOffRepository
      .createQueryBuilder('clockOff')
      .innerJoinAndSelect('clockOff.job', 'job')
      .innerJoinAndSelect('clockOff.staff', 'staff', 'staff.id = :staffId', {
        staffId: staffId,
      })
      .select(['clockOff.id', 'job.id'])
      .getMany();
  }

  /**
   * get all clocks off of a staff person for today
   */
  async getTodayClockOffs(staffId: number) {
    const now = getTodayStart();

    return this.clockOffRepository
      .createQueryBuilder('clockOff')
      .innerJoinAndSelect('clockOff.job', 'job')
      .innerJoinAndSelect('clockOff.staff', 'staff', 'staff.id = :staffId', {
        staffId: staffId,
      })
      .where(
        `DATE(job.requestDate) >= DATE(:now) AND DATE(job.requestDate) < DATE(:now) + INTERVAL '1 DAY'`,
        { now },
      )
      .select(['clockOff.id', 'job.id'])
      .getMany();
  }

  /**
   * get all clock ins of a staff person for today
   */
  async getTodayClockIns(staffId: number) {
    const now = getTodayStart();

    return this.clockInRepository
      .createQueryBuilder('clockIn')
      .innerJoinAndSelect('clockIn.job', 'job')
      .innerJoin('clockIn.staff', 'staff', 'staff.id = :staffId', {
        staffId,
      })
      .where(
        `DATE(job.requestDate) >= DATE(:now) AND DATE(job.requestDate) < DATE(:now) + INTERVAL '1 DAY'`,
        { now },
      )
      .select(['clockIn.id', 'job.id'])
      .getMany();
  }
}
