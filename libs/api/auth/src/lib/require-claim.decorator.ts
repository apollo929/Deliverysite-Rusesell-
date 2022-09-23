import { SetMetadata } from '@nestjs/common';
import { Claim } from '@dfobobcat/api/shared/const';

export const CLAIMS_KEY = 'claims';
export const RequireClaim = (...claims: Claim[]) =>
  SetMetadata(CLAIMS_KEY, claims);
