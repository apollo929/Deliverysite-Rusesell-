import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { RequireClaim } from '@dfobobcat/api/auth';
import { Claim } from '@dfobobcat/api/shared/const';
import { ClockingService } from '@dfobobcat/api/feature/clocking';
import { AddClockInInput, AddClockOffInput } from '@dfobobcat/graphql-types';

@Resolver()
export class ClockingResolver {
  constructor(private clockingService: ClockingService) {}
  @Mutation()
  @RequireClaim(Claim.AddClockIn)
  async addClockIn(@Context() ctx: any, @Args('input') args: AddClockInInput) {
    return await this.clockingService.addClockIn(ctx, args);
  }
  @Mutation()
  @RequireClaim(Claim.AddClockOff)
  async addClockOff(
    @Context() ctx: any,
    @Args('input') args: AddClockOffInput,
  ) {
    return { success: await this.clockingService.addClockOff(ctx, args) };
  }
}
