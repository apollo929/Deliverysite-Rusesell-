import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company, Role, Token, User } from '@dfobobcat/api/entity';
import {
  RegisterBuilderInput,
  RegisterUserInput,
  RoleType,
  UpdateMyAccountMutationVariables,
} from '@dfobobcat/graphql-types';
import { GqlContext } from '@dfobobcat/api/shared/model';
import { ConfigService } from '@nestjs/config';
import { UserError } from '@dfobobcat/api/shared/exception';
import { generateToken } from '@dfobobcat/api/shared/tool';
import { EmailService, EmailType } from '@dfobobcat/api/email';
import { CompanyService } from '@dfobobcat/api/feature/company';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private configService: ConfigService,
    private emailService: EmailService,
    private companyService: CompanyService,
  ) {}
  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new UserError('User with this email does not exist');
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }

    throw new UserError('User does not exist');
  }

  async sendEmailVerify(user: User): Promise<void> {
    const tokenString = generateToken();
    let token = await this.tokenRepository.findOne({ user: user });
    const expires = new Date(
      Date.now() + Number(this.configService.get('VERIFY_EMAIL_TOKEN_EXPIRE')),
    ).toISOString();
    const tokenData = {
      verifyEmailToken: tokenString,
      verifyEmailExpires: expires,
    };
    if (!token) {
      token = await this.tokenRepository.create({ ...tokenData, user });
      await this.tokenRepository.save(token);
    } else {
      await this.tokenRepository.save({ ...token, ...tokenData });
    }
    const query = new URLSearchParams({
      token: tokenString,
    }).toString();
    const url = `${this.configService.get('VERIFY_EMAIL_URL')}?${query}`;
    this.emailService.sendEmail<EmailType.VERIFY_EMAIL>(
      user.email,
      EmailType.VERIFY_EMAIL,
      {
        username: user.name,
        url,
      },
    );
  }

  async create(ctx: GqlContext, userData: RegisterUserInput) {
    const user = await this.usersRepository.findOne({ email: userData.email });
    if (user) {
      throw new UserError('User with such email already exists.');
    }

    const { roleId, company: companyName, ...userFromData } = userData;
    let company = null;
    if (companyName) {
      company = await this.companyRepository.findOne({ name: companyName });
      if (!company) {
        company = await this.companyService.addCompany({
          name: companyName as string,
        });
      }
    }

    const foundRole = await this.roleRepository.findOneOrFail({
      id: roleId,
    });
    const newUser = await this.usersRepository.create({
      ...userFromData,
      company: company as Company,
      emailVerified: true,
    });
    newUser.role = foundRole;
    await this.usersRepository.save(newUser);
    const url = `${this.configService.get('LOGIN_AUTH_LINK')}`;
    if (newUser.role.name === RoleType.Builder) {
      this.emailService.sendEmail<EmailType.BUILDER_SIGNUP>(
        newUser.email,
        EmailType['BUILDER_SIGNUP'],
        {
          username: newUser.name,
          email: newUser.email,
          password: userData.password,
          url: url,
        },
      );

      const loginToken = generateToken();

      const expires = new Date(
        Date.now() + Number(this.configService.get('LOGIN_TOKEN_EXPIRE')),
      ).toISOString();

      const token = await this.tokenRepository.create({
        user: newUser,
        builderLoginToken: loginToken,
        builderLoginExpire: expires,
      });
      await this.tokenRepository.save(token);
    }

    if ([RoleType.Laborer, RoleType.Operator].includes(newUser.role.name)) {
      this.emailService.sendEmail<EmailType.BUILDER_SIGNUP>(
        newUser.email,
        EmailType['BUILDER_SIGNUP'],
        {
          username: newUser.name,
          email: newUser.email,
          password: userData.password,
          url: url,
        },
      );
    }
    return true;
  }

  async createBuilder(ctx: GqlContext, userData: RegisterBuilderInput) {
    const { company: companyName, ...userFromData } = userData;
    let company = null;
    if (companyName) {
      company = await this.companyRepository.findOne({ name: companyName });
      if (!company) {
        company = await this.companyService.addCompany({
          name: companyName as string,
        });
      }
    }

    const user = await this.usersRepository.findOne({ email: userData.email });
    if (user) {
      throw new UserError('User with such email already exists.');
    }

    const foundRole = await this.roleRepository.findOneOrFail({
      name: RoleType.Builder,
    });
    const newUser = await this.usersRepository.create({
      ...userFromData,
      company,
    });
    newUser.role = foundRole;
    await this.usersRepository.save(newUser);

    const loginToken = generateToken();

    const expires = new Date(
      Date.now() + Number(this.configService.get('LOGIN_TOKEN_EXPIRE')),
    ).toISOString();

    const token = await this.tokenRepository.create({
      user: newUser,
      builderLoginToken: loginToken,
      builderLoginExpire: expires,
    });
    await this.tokenRepository.save(token);

    await this.sendEmailVerify(newUser);
    return true;
  }

  async updateUserAccount(
    userId: number,
    args: UpdateMyAccountMutationVariables,
  ) {
    const user = await this.usersRepository.findOneOrFail(
      { id: userId },
      { relations: ['role'] },
    );

    Object.assign(user, args);
    await this.usersRepository.save(user);
    return user;
  }
}
