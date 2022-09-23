import { SetMetadata } from '@nestjs/common';
import { GuardService } from './service/guard.service';
export type authCbType = (
  guardService: GuardService,
  ctx: any,
  args: any,
) => boolean | Promise<boolean>;
export const AUTH_CALLBACK_KEY = 'AUTH_CALLBACK';
export const AuthCallback = (cb: authCbType) =>
  SetMetadata(AUTH_CALLBACK_KEY, cb);
