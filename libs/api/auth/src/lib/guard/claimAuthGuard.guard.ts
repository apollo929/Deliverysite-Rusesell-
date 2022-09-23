import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CLAIMS_KEY } from '../require-claim.decorator';
import { Claim } from '@dfobobcat/api/shared/const';
import { GqlExecutionContext } from '@nestjs/graphql';
import { defineAbilityFor } from '@dfobobcat/api/auth/util';
import { authCbType, AUTH_CALLBACK_KEY } from '../auth-callback.decorator';
import { GuardService } from '../..';
@Injectable()
export class ClaimAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private guardService: GuardService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const claimAuth = () => {
      const requiredClaims = this.reflector.getAllAndOverride<Claim[]>(
        CLAIMS_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredClaims || !Array.isArray(requiredClaims)) {
        return false;
      }

      if (
        requiredClaims.length === 1 &&
        requiredClaims[0] === Claim.PublicMethod
      ) {
        return true;
      }

      const ctx = GqlExecutionContext.create(context);
      const gqlContext = ctx.getContext();
      const ability = defineAbilityFor(gqlContext);
      for (const claim of requiredClaims) {
        if (ability.cannot(claim)) {
          return false;
        }
      }
      return true;
    };
    const callbackAuth = () => {
      const cb = this.reflector.getAllAndOverride<authCbType>(
        AUTH_CALLBACK_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!cb) {
        return false;
      }

      const ctx = GqlExecutionContext.create(context);
      const gqlContext = ctx.getContext();
      const args = gqlContext?.req?.body?.variables;
      return cb(this.guardService, gqlContext, args);
    };

    return claimAuth() || callbackAuth();
  }
}
