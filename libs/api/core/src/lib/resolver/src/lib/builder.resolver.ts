import { Parent, ResolveField, Resolver, Args } from '@nestjs/graphql';

import { User } from '@dfobobcat/api/entity';
import { BuilderJobService } from '@dfobobcat/api/feature/job';
import { BuilderJobRequestsArgs } from '@dfobobcat/graphql-types';
@Resolver('Builder')
export class BuilderResolver {
  constructor(private builderJobService: BuilderJobService) {}

  @ResolveField()
  async jobRequests(
    @Parent() builder: User,
    @Args() args: BuilderJobRequestsArgs,
  ) {
    const { id } = builder;
    return this.builderJobService.getBuilderJobs(id, args);
  }
}
