import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  AssignToJobInput,
  CreateJobInput,
  QueryJobArgs,
  QueryJobsArgs,
  UpdateJobInput,
  UpdateJobDateInput,
} from '@dfobobcat/graphql-types';
import { RequireClaim, AuthCallback } from '@dfobobcat/api/auth';
import { Claim } from '@dfobobcat/api/shared/const';
import { JobService } from '@dfobobcat/api/feature/job';
import { Job } from '@dfobobcat/api/entity';
@Resolver('Job')
export class JobResolver {
  constructor(private jobService: JobService) { }

  @ResolveField()
  @RequireClaim(Claim.GetAllClockOffs)
  async clockOffs(@Parent() job: Job) {
    const { id } = job;
    return this.jobService.getJobClockOffs(id);
  }

  @ResolveField()
  @RequireClaim(Claim.GetAllClockIns)
  async clockIns(@Parent() job: Job) {
    const { id } = job;
    return this.jobService.getJobClockIns(id);
  }

  @Mutation()
  @RequireClaim(Claim.CreateJob)
  async createJob(@Context() ctx: any, @Args('input') args: CreateJobInput) {
    return { success: await this.jobService.createJob(ctx, args) };
  }

  @Mutation()
  @RequireClaim(Claim.UpdateOwnJob)
  async updateJob(@Context() ctx: any, @Args('input') args: UpdateJobInput) {
    return { success: await this.jobService.updateJob(ctx, args) };
  }
  @Mutation()
  @RequireClaim(Claim.UpdateOwnJob)
  async updateJobDate(
    @Context() ctx: any,
    @Args('input') args: UpdateJobDateInput,
  ) {
    return { success: await this.jobService.updateJobDate(ctx, args) };
  }

  @Mutation()
  @RequireClaim(Claim.CancelOwnJob)
  async cancelJob(@Context() ctx: any, @Args('jobId') jobId: number) {
    return { success: await this.jobService.cancelJob(ctx, jobId) };
  }

  @Query()
  @AuthCallback((guardService, ctx, args) => guardService.canGetJob(ctx, args))
  async job(@Args() args: QueryJobArgs) {
    return this.jobService.getJob(args.id);
  }

  @Query()
  @RequireClaim(Claim.GetAllJobs)
  async jobs(@Args() args: QueryJobsArgs) {
    return this.jobService.getJobs(args);
  }

  @Mutation()
  @RequireClaim(Claim.AssignToJob)
  async assignToJob(
    @Context() ctx: any,
    @Args('input') args: AssignToJobInput,
  ) {
    return { success: await this.jobService.assignToJob(ctx, args) };
  }
}
