import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import {
  UpdateUserInput,
  Success,
  UsersQueryVariables,
} from '@dfobobcat/graphql-types';
import { AdminService } from '@dfobobcat/api/feature/admin';
import { RequireClaim } from '@dfobobcat/api/auth';
import { Claim } from '@dfobobcat/api/shared/const';
@Resolver()
export class AdminResolver {
  constructor(private adminService: AdminService) {}

  @Mutation()
  @RequireClaim(Claim.UpdateAllUsers)
  async updateUser(
    @Context() ctx: any,
    @Args('input') args: UpdateUserInput,
  ): Promise<Success> {
    return { success: await this.adminService.updateUser(ctx, args) };
  }

  @Mutation()
  @RequireClaim(Claim.DeleteAllUsers)
  async deleteUser(
    @Context() ctx: any,
    @Args('userId') userId: number,
  ): Promise<Success> {
    return { success: await this.adminService.deleteUser(userId) };
  }

  @Query()
  @RequireClaim(Claim.GetAllUsers)
  async users(@Args() args: UsersQueryVariables) {
    return this.adminService.getUsers(args);
  }
  @Query()
  @RequireClaim(Claim.GetAllRoles)
  async staffRoles() {
    return this.adminService.staffRoles();
  }
}
