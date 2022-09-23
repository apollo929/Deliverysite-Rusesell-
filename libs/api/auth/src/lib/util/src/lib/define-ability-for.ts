import { User } from '@dfobobcat/api/entity';
import { PureAbility, AbilityBuilder } from '@casl/ability';
import { Claim } from '@dfobobcat/api/shared/const';
import { RoleType } from '@dfobobcat/graphql-types';
import { GqlContext } from '@dfobobcat/api/shared/model';
import { UserError } from '@dfobobcat/api/shared/exception';

const GuestType = 'guest';

//https://stackoverflow.com/a/64966647
type AppAbility = PureAbility<`${Claim}`>;
type DefinePermissions = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void;

const rolePermissions: Record<
  `${RoleType | typeof GuestType}`,
  DefinePermissions
> = {
  [GuestType]: (user, { can }) => {
    can(Claim.CreateBuilder);
  },

  [RoleType.Builder]: (user, { can }) => {
    can(Claim.CreateJob);
    can(Claim.UpdateOwnJob);
    can(Claim.CancelOwnJob);
    can(Claim.GetOwnJobs);
    can(Claim.GetEquipment);
    can(Claim.Authenticated);
    can(Claim.UpdateOwnAccount);
  },

  [RoleType.Operator]: (user, { can }) => {
    can(Claim.GetOwnJobs);
    can(Claim.AddClockIn);
    can(Claim.AddClockOff);
    can(Claim.GetEquipment);
    can(Claim.Authenticated);
    can(Claim.UpdateOwnAccount);
  },

  [RoleType.Laborer]: (user, { can }) => {
    can(Claim.GetOwnJobs);
    can(Claim.AddClockIn);
    can(Claim.AddClockOff);
    can(Claim.GetEquipment);
    can(Claim.Authenticated);
    can(Claim.UpdateOwnAccount);
  },

  [RoleType.Admin]: (user, { can }) => {
    can(Claim.CreateJob);
    can(Claim.GetAllJobs);
    can(Claim.AssignToJob);
    can(Claim.GetEquipment);
    can(Claim.GetAllStaff);
    can(Claim.GetAllClockOffs);
    can(Claim.GetOwnJobs);
    can(Claim.CreateLaborer);
    can(Claim.CreateOperator);
    can(Claim.CreateAdmin);
    can(Claim.CreateBuilder);
    can(Claim.GetAllRoles);
    can(Claim.UpdateAllUsers);
    can(Claim.UpdateAllJobs);
    can(Claim.UpdateOwnJob);
    can(Claim.GetAllReports);
    can(Claim.GetAllUsers);
    can(Claim.Authenticated);
    can(Claim.CancelAllJobs);
    can(Claim.UpdateOwnAccount);
    can(Claim.DeleteAllUsers);
    can(Claim.GetCompanies);
    can(Claim.AddCompany);
  },
};

export function defineAbilityFor(ctx: GqlContext): AppAbility {
  const builder = new AbilityBuilder<AppAbility>(PureAbility);
  const user = ctx.getUser();
  const role: RoleType | typeof GuestType = ctx.isAuthenticated()
    ? (user.role.name as RoleType)
    : GuestType;
  if (typeof rolePermissions[role] === 'function') {
    rolePermissions[role](user, builder);
  } else {
    throw new UserError(`Trying to use unknown role "${user.role}"`);
  }

  return builder.build();
}
