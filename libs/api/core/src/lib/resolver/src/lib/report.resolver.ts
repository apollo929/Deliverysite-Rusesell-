import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { RequireClaim } from '@dfobobcat/api/auth';
import { Claim } from '@dfobobcat/api/shared/const';
import {
  ReportJobsForDateArgs,
  ReportTotalWorkedHoursArgs,
  ReportJobsForDateFullListArgs,
} from '@dfobobcat/graphql-types';
import { ReportService } from '@dfobobcat/api/feature/report';
@Resolver('Report')
export class ReportResolver {
  constructor(private reportService: ReportService) {}

  @Query()
  @RequireClaim(Claim.GetAllReports)
  report() {
    return {};
  }

  @ResolveField()
  async totalWorkedHours(@Args() args: ReportTotalWorkedHoursArgs) {
    return this.reportService.getTotalWorkedHours(args);
  }

  @ResolveField()
  async jobsForDate(@Args() args: ReportJobsForDateArgs) {
    return this.reportService.getJobsForDate(args);
  }

  @ResolveField()
  async jobsForDateFullList(@Args() args: ReportJobsForDateFullListArgs) {
    return this.reportService.getJobsForDateFullList(args);
  }
}
