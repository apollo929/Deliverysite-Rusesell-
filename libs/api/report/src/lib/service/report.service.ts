import { Repository } from 'typeorm';

import { User, Role as RoleEntity, ClockOff, Job } from '@dfobobcat/api/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getOrderAndDirection } from '@dfobobcat/api/shared/tool';
import {
  JobStatus,
  ReportJobsForDateArgs,
  TotalWorkedHoursQueryVariables,
  ReportJobsForDateFullListArgs,
  TotalWorkedHoursReportPaginated,
} from '@dfobobcat/graphql-types';
export class ReportService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    @InjectRepository(ClockOff)
    private clockOffRepository: Repository<ClockOff>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async getTotalWorkedHours(args: TotalWorkedHoursQueryVariables) {
    const offset = args.pagination?.offset ? args.pagination.offset : 15;
    const page = args.pagination?.page ? args.pagination.page : 0;
    const skip = page * offset;

    let orderBy = getOrderAndDirection(args.orderBy);
    if (!orderBy) {
      orderBy = ['user.name', 'ASC'];
    }

    const date = new Date();
    const startDate = args.startDate
      ? args.startDate
      : new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    const endDate = args.endDate
      ? args.endDate
      : new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();

    const query = this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.role', 'role', 'role.name IN (:...staffRoles)', {
        staffRoles: ['laborer', 'operator'],
      });
    if (args && args.search && args.search.length) {
      if (args.search && args.search.length > 0) {
        query.where('LOWER(user.name) like :name', {
          name: `%${args.search.toLowerCase()}%`,
        });
      }
    }

    query
      .leftJoinAndSelect(
        'user.clockOffs',
        'clockOff',
        `DATE(clockOff.clockOffTime) >= DATE(:startDate) AND DATE(clockOff.clockOffTime) <= DATE(:endDate)`,
        {
          startDate,
          endDate,
        },
      )
      .select([
        'user.id',
        'user.name as name',
        'user.email as email',
        'SUM(clockOff.totalTimeWorked)::INTEGER AS "totalWorkedHours"',
      ]);

    const totalClone = query.clone();
    const total = await totalClone.getCount();
    const hasNextPage = total > (page + 1) * offset;
    const hasPreviousPage = page > 0;
    const nextPage = hasNextPage ? page + 1 : undefined;
    const previousPage = hasPreviousPage ? page - 1 : undefined;
    const r = {
      items: await query
        .orderBy(orderBy[0], orderBy[1], 'NULLS LAST')
        .groupBy('user.id')
        .offset(skip)
        .limit(offset)
        .getRawMany(),
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      },
    };
    return r;
  }

  async getJobsForDate(args: ReportJobsForDateArgs) {
    const offset = args.pagination?.offset ? args.pagination.offset : 15;
    const page = args.pagination?.page ? args.pagination.page : 0;
    const skip = page * offset;

    let orderBy = getOrderAndDirection(args.orderBy);
    if (!orderBy) {
      orderBy = ['job.address', 'ASC'];
    }

    const date = new Date();
    const selectedDate = args.date
      ? args.date
      : new Date(date.getFullYear(), date.getMonth(), 1).toISOString();

    const query = this.jobsRepository
      .createQueryBuilder('job')
      .where('DATE(job.requestDate) = DATE(:selectedDate)', { selectedDate })
      .andWhere('job.status = :jobStatus', {
        jobStatus: JobStatus.Completed,
      });

    const totalClone = query.clone();
    const total = await totalClone.getCount();
    const hasNextPage = total > (page + 1) * offset;
    const hasPreviousPage = page > 0;
    const nextPage = hasNextPage ? page + 1 : undefined;
    const previousPage = hasPreviousPage ? page - 1 : undefined;

    if (args && args.search && args.search.length) {
      if (args.search && args.search.length > 0) {
        query.andWhere('LOWER(job.address) like :name', {
          name: `%${args.search.toLowerCase()}%`,
        });
      }
    }
    const queryIds = query.offset(skip).limit(offset).select('job.id');
    const result = await this.jobsRepository
      .createQueryBuilder('job')
      .innerJoinAndSelect('job.staff', 'staff')
      .innerJoinAndSelect('job.equipment', 'equipment')
      .innerJoinAndSelect('job.builder', 'builder')
      .where(`job.id IN (${queryIds.getQuery()})`)
      .setParameters(queryIds.getParameters())
      .orderBy(orderBy[0], orderBy[1], 'NULLS LAST')
      .getMany();
    return {
      items: result,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      },
    };
  }

  async getJobsForDateFullList(args: ReportJobsForDateFullListArgs) {
    let orderBy = getOrderAndDirection(args.orderBy);
    if (!orderBy) {
      orderBy = ['job.address', 'ASC'];
    }

    const date = new Date();
    const selectedDate = args.date
      ? args.date
      : new Date(date.getFullYear(), date.getMonth(), 1).toISOString();

    const query = this.jobsRepository
      .createQueryBuilder('job')
      .innerJoinAndSelect('job.staff', 'staff')
      .innerJoinAndSelect('job.equipment', 'equipment')
      .innerJoinAndSelect('job.builder', 'builder')
      .where('DATE(job.requestDate) = DATE(:selectedDate)', { selectedDate })
      .andWhere('job.status = :jobStatus', {
        jobStatus: JobStatus.Completed,
      });

    if (args && args.search && args.search.length) {
      if (args.search && args.search.length > 0) {
        query.andWhere('LOWER(job.address) like :name', {
          name: `%${args.search.toLowerCase()}%`,
        });
      }
    }

    const result = (
      await query.orderBy(orderBy[0], orderBy[1], 'NULLS LAST').getMany()
    ).map((item) => {
      const equipment = item.equipment.map((item) => item.name).join(', ');
      const staff = item.staff.map((item) => item.name).join(', ');

      return {
        ...item,
        builder: item.builder.name,
        equipment,
        staff,
        notes: '',
        priority: '',
        cost: '',
      };
    });

    return result;
  }
}
