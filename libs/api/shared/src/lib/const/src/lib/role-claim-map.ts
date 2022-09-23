import { RoleType } from '@dfobobcat/graphql-types';
import { Claim } from './claim';

export const roleClaimMap: Record<RoleType, Claim> = {
  [RoleType.Admin]: Claim.CreateAdmin,
  [RoleType.Builder]: Claim.CreateBuilder,
  [RoleType.Laborer]: Claim.CreateLaborer,
  [RoleType.Operator]: Claim.CreateOperator,
};
