import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@dfobobcat/api/entity';
import { Repository } from 'typeorm';
import { AuthService, UserService } from '@dfobobcat/api/shared/service';
import {
  MutationRestorePasswordArgs,
  MutationTokenLoginArgs,
  RegisterBuilderInput,
  RegisterUserInput,
  VerifyEmailMutationVariables,
} from '@dfobobcat/graphql-types';
import { UseGuards } from '@nestjs/common';
import { LogInWithCredentialsGuard } from '../guard/logInWithCredentialsGuard';
import { RequireClaim } from '../require-claim.decorator';
import { Claim } from '@dfobobcat/api/shared/const';
import { AuthCallback } from '../auth-callback.decorator';
@Resolver()
export class AuthResolver {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Mutation()
  @AuthCallback((guardService, ctx, args) =>
    guardService.canCreateUserWithRole(ctx, args),
  )
  async register(@Context() ctx: any, @Args('input') args: RegisterUserInput) {
    const success = await this.userService.create(ctx, args);
    return { success };
  }

  @Mutation()
  @RequireClaim(Claim.PublicMethod)
  async registerBuilder(
    @Context() ctx: any,
    @Args('input') args: RegisterBuilderInput,
  ) {
    const success = await this.userService.createBuilder(ctx, args);
    return { success };
  }

  @RequireClaim(Claim.PublicMethod)
  @UseGuards(LogInWithCredentialsGuard)
  @Mutation()
  async login(@Context() ctx: any) {
    const user = ctx.getUser();
    return {
      name: user.name,
      role: user.role,
      email: user.email,
    };
  }

  @Mutation()
  @RequireClaim(Claim.PublicMethod)
  async logout(@Context() ctx: any) {
    return { success: this.authService.logout(ctx) };
  }

  @Mutation()
  @RequireClaim(Claim.PublicMethod)
  async forgotPassword(@Args('email') email: string) {
    return { success: this.authService.forgotPassword(email) };
  }

  @Mutation()
  @RequireClaim(Claim.PublicMethod)
  async restorePassword(@Args() args: MutationRestorePasswordArgs) {
    return { success: this.authService.restorePassword(args) };
  }

  @Mutation()
  @RequireClaim(Claim.PublicMethod)
  async verifyEmail(@Args() args: VerifyEmailMutationVariables) {
    return { success: this.authService.verifyEmail(args) };
  }

  @Mutation()
  @RequireClaim(Claim.PublicMethod)
  async tokenLogin(@Context() ctx: any, @Args() args: MutationTokenLoginArgs) {
    return this.authService.tokenLogin(ctx, args.token);
  }
}
