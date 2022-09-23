import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { User } from '@dfobobcat/api/entity';
import { StaffJobService } from '@dfobobcat/api/feature/job';
import {
  JobFilter,
  StaffAssignedJobsArgs,
  StaffHasClockedIntoJobArgs,
} from '@dfobobcat/graphql-types';
import { ReportService } from '@dfobobcat/api/feature/report';
import { ClockingService } from '@dfobobcat/api/feature/clocking';

@Resolver('Staff')
export class StaffResolver {
  constructor(
    private staffJobService: StaffJobService,
    private reportService: ReportService,
    private clockingService: ClockingService,
  ) {}

  @ResolveField()
  async assignedJobs(
    @Parent() user: User,
    @Args() args: StaffAssignedJobsArgs,
  ) {
    const { id } = user;
    const filter = args.filter ? args.filter : JobFilter.Upcoming;

    return this.staffJobService.getStaffJobs(id, args);
  }

  @ResolveField()
  async todaysAssignedJob(@Parent() user: User) {
    const { id } = user;
    return this.staffJobService.getTodaysAssignedJob(id);
  }

  @ResolveField()
  async hasClockedIntoJob(
    @Parent() user: User,
    @Args() { id }: StaffHasClockedIntoJobArgs,
  ) {
    const { id: userId } = user;

    return this.clockingService.hasClockedInToJob(id, userId);
  }
}
