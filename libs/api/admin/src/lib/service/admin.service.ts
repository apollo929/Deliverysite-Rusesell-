import { Repository } from 'typeorm';
import {
  QueryUsersArgs,
  UpdateUserInput,
  RoleType,
} from '@dfobobcat/graphql-types';
import {
  User,
  ClockOff,
  Role as RoleEntity,
  Company,
} from '@dfobobcat/api/entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  findIdOrThrow,
  getOrderAndDirection,
} from '@dfobobcat/api/shared/tool';
import { CompanyService } from '@dfobobcat/api/feature/company';

export class AdminService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ClockOff)
    private clockOffRepository: Repository<ClockOff>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private companyService: CompanyService,
  ) {}

  async deleteUser(userId: number) {
    await this.usersRepository.delete(userId);

    return true;
  }

  async updateUser(ctx: any, args: UpdateUserInput): Promise<boolean> {
    const { userId, roleId, company: companyName, ...updateData } = args;
    const user = await findIdOrThrow<User>(this.usersRepository, userId);

    let company = await this.companyRepository.findOne({ name: companyName });

    //fixing the bug
    if (!company && companyName) {
      company = await this.companyService.addCompany({
        name: companyName as string,
      });
    }

    if(company)
    {
      (updateData as any).company = company;
    }

    let role: RoleType;
    if (roleId) {
      role = await findIdOrThrow<RoleType>(this.roleRepository, roleId);
      (updateData as any).role = role as RoleType;
    }

    await this.usersRepository.update(user.id, updateData);

    return true;
  }

  async getUsers(args: QueryUsersArgs) {
    let orderBy = getOrderAndDirection(args.orderBy);
    if (!orderBy) {
      orderBy = ['user.name', 'ASC'];
    }

    const query = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company');

    if (args.role === 'staff') {
      query.innerJoinAndSelect(
        'user.role',
        'role',
        'role.name = :operator OR role.name = :laborer',
        {
          operator: RoleType.Operator,
          laborer: RoleType.Laborer,
        },
      );
    } else if (args.role === 'builder') {
      query.innerJoinAndSelect('user.role', 'role', 'role.name = :builder', {
        builder: RoleType.Builder,
      });
    } else {
      query.innerJoinAndSelect('user.role', 'role');
    }
    if (args && args.search && args.search.length) {
      if (args.search && args.search.length > 0) {
        query.where('LOWER(user.name) like :name', {
          name: `%${args.search.toLowerCase()}%`,
        });
      }
    }
    query.orderBy(orderBy[0], orderBy[1]);
    if (args.pagination) {
      const offset = args.pagination?.offset ? args.pagination.offset : 15;
      const page = args.pagination?.page ? args.pagination.page : 0;
      const skip = page * offset;
      const totalClone = query.clone();
      const total = await totalClone.getCount();
      const hasNextPage = total > (page + 1) * offset;
      const hasPreviousPage = page > 0;
      const nextPage = hasNextPage ? page + 1 : undefined;
      const previousPage = hasPreviousPage ? page - 1 : undefined;
      return {
        items: await query.offset(skip).limit(offset).getMany(),
        pageInfo: {
          hasNextPage,
          hasPreviousPage,
          nextPage,
          previousPage,
        },
      };
    }
    return {
      items: await query.getMany(),
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        nextPage: undefined,
        previousPage: undefined,
      },
    };
  }

  async staffRoles() {
    return this.roleRepository
      .createQueryBuilder('role')
      .where('role.name IN (:laborer, :operator)', {
        laborer: RoleType.Laborer,
        operator: RoleType.Operator,
      })
      .select(['role.id', 'role.name'])
      .getMany();
  }

  /*
  async getStaff(ctx: any, page?: number) {
    const query = this.usersRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect(
        'user.role',
        'role',
        'role.name = :operator OR role.name = :laborer',
        {
          operator: RoleType.Operator,
          laborer: RoleType.Laborer,
        },
      )
      .orderBy('user.name', 'ASC')
      .select([
        'user.id AS id',
        'role.name AS role',
        'user.name AS name',
        'user.email AS email',
      ]);
    if (page) {
      const PAGE_SIZE = 20;
      const offset = page * PAGE_SIZE;
      query.skip(offset).take(PAGE_SIZE);
    }

    return query.getRawMany();
  }

  async getBuilders(ctx: any, page?: number) {
    const query = this.usersRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role', 'role.name = :builder', {
        builder: RoleType.Builder,
      })
      .orderBy('user.name', 'ASC')
      .select([
        'user.id AS id',
        'role.name AS role',
        'user.name AS name',
        'user.email AS email',
      ]);
    if (page) {
      const PAGE_SIZE = 20;
      const offset = page * PAGE_SIZE;
      query.skip(offset).take(PAGE_SIZE);
    }

    return query.getRawMany();
  } */
}
