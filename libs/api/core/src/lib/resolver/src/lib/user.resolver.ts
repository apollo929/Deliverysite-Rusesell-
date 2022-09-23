import {
  Args,
  Context,
  Mutation,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';

import { RequireClaim } from '@dfobobcat/api/auth';
import { Claim } from '@dfobobcat/api/shared/const';
import { UserService } from '@dfobobcat/api/shared/service';
import { User } from '@dfobobcat/api/entity';
import {
  RoleType,
  UpdateMyAccountMutationVariables,
} from '@dfobobcat/graphql-types';
import { UserError } from '@dfobobcat/api/shared/exception';
@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  @RequireClaim(Claim.Authenticated)
  async me(@Context() ctx: any) {
    const user = ctx.getUser();
    return this.userService.getById(user.id);
  }

  @Query()
  @RequireClaim(Claim.GetAllUsers)
  async user(@Args('id') id: number) {
    return this.userService.getById(id);
  }

  @Mutation()
  @RequireClaim(Claim.UpdateOwnAccount)
  updateMyAccount(
    @Context() ctx: any,
    @Args() args: UpdateMyAccountMutationVariables,
  ) {
    return this.userService.updateUserAccount(ctx?.getUser()?.id, args);
  }
}
@Resolver('User')
export class UserTypeResolver {
  @ResolveProperty()
  __resolveType(user: User) {
    if (user.role.name === RoleType.Builder) {
      return 'Builder';
    } else if (
      user.role.name === RoleType.Laborer ||
      user.role.name === RoleType.Operator
    ) {
      return 'Staff';
    } else if (user.role.name === RoleType.Admin) {
      return 'Admin';
    }
    throw new UserError('Role does not exist');
  }
}
