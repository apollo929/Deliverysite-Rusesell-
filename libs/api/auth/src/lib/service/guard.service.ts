import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  RegisterMutationVariables,
  RoleType,
} from '@dfobobcat/graphql-types';
import { User, Job, Equipment, ClockOff, Role } from '@dfobobcat/api/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Claim, roleClaimMap } from '@dfobobcat/api/shared/const';
import { defineAbilityFor } from '@dfobobcat/api/auth/util';

/**
 * Contains functions to validate
 * access to endpoints that require
 * more advanced authorization checking
 */
@Injectable()
export class GuardService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Equipment)
    private equipmentsRepository: Repository<Equipment>,
    @InjectRepository(ClockOff)
    private clockOffRepository: Repository<ClockOff>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  async canGetJob(ctx: any, args: any): Promise<boolean> {
    const ability = defineAbilityFor(ctx);
    const user = ctx.getUser();

    const job = await this.jobsRepository
      .createQueryBuilder('job')
      .innerJoinAndSelect('job.builder', 'builder')
      .where('job.id = :id', { id: args.id })
      .getOne();

    if (!job) {
      return false;
    }

    const assignedToJob = !!(await this.jobsRepository
      .createQueryBuilder('job')
      .innerJoin('job.staff', 'staff', 'staff.id = :staffId', {
        staffId: user.id,
      })
      .where(`job.id = :jobId`, { jobId: args.id })
      .limit(1)
      .getOne());

    const canGetJob =
      ability.can(Claim.GetAllJobs) ||
      (ability.can(Claim.GetOwnJobs) &&
        user.hasRole(RoleType.Builder) &&
        job.builder.id == user.id) ||
      (ability.can(Claim.GetOwnJobs) &&
        (user.hasRole(RoleType.Operator) || user.hasRole(RoleType.Laborer)) &&
        assignedToJob);

    if (canGetJob) {
      return true;
    }
    return false;
  }

  async canCreateUserWithRole(
    ctx: any,
    { input }: { input: RegisterMutationVariables['input'] },
  ): Promise<boolean> {
    const ability = defineAbilityFor(ctx);
    const { roleId } = input;
    const foundRole = await this.roleRepository.findOneOrFail({
      id: roleId,
    });
    if (ability.can(roleClaimMap[foundRole.name as RoleType])) {
      return true;
    }
    return false;
  }
}
