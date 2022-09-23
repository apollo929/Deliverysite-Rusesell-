import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, Equipment, User, ClockOff } from '@dfobobcat/api/entity';
import { BuilderJobRequestsArgs, JobStatus } from '@dfobobcat/graphql-types';

export class BuilderJobService {
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
  ) {}

  public async getBuilderJobs(builderId: number, args: BuilderJobRequestsArgs) {
    const status = args.status ? args.status : JobStatus.Assigned;
    const query = this.jobsRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.equipment', 'equipment')
      .leftJoinAndSelect('job.activity', 'activity')
      .where('job.builder.id = :builderId', { builderId });

    if (status) {
      query.andWhere('job.status = :status', { status });
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

     const results = await query
      .orderBy('job.requestDate', 'DESC');
    const builderJobs = await results.getMany();
    return builderJobs
  }
}
