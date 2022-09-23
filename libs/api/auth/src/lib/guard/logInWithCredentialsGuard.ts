import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UserError } from '@dfobobcat/api/shared/exception';
@Injectable()
export class LogInWithCredentialsGuard extends AuthGuard('graphql-local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext();
    if (!gqlContext.user.emailVerified) {
      throw new UserError('Please verify your email');
    }
    gqlContext.login(gqlContext.user);
    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs();
    return request;
  }
}
