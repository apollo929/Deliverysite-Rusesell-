import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserError } from '@dfobobcat/api/shared/exception';
import { generateToken } from '@dfobobcat/api/shared/tool';
import { EmailService, EmailType } from '@dfobobcat/api/email';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token, User } from '@dfobobcat/api/entity';
import {
  MutationRestorePasswordArgs,
  RoleType,
  VerifyEmailMutationVariables,
} from '@dfobobcat/graphql-types';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private emailService: EmailService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new UserError(error.message);
    }
  }

  public logout(ctx: any) {
    if (ctx.getUser()) {
      ctx.logout();
    }
    return true;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new UserError('Wrong credentials provided');
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userService.getByEmail(email);
    const tokenString = generateToken();
    let token = await this.tokenRepository.findOne({ user: user });
    if (!token) {
      token = this.tokenRepository.create({
        resetPasswordToken: tokenString,
        resetPasswordExpires: new Date(Date.now() + 3600000).toISOString(),
        user,
      });
      await this.tokenRepository.save(token);
    } else {
      token.resetPasswordToken = tokenString;
      token.resetPasswordExpires = new Date(Date.now() + 3600000).toISOString();
      await this.tokenRepository.save(token);
    }

    const query = new URLSearchParams({
      token: tokenString,
    }).toString();
    const url = `${this.configService.get('RESTORE_PASSWORD_URL')}?${query}`;
    this.emailService.sendEmail<EmailType.FORGOT_PASSWORD>(
      email,
      EmailType.FORGOT_PASSWORD,
      {
        url,
        username: user.name,
      },
    );
    return true;
  }

  async restorePassword(args: MutationRestorePasswordArgs) {
    const token = await this.tokenRepository
      .createQueryBuilder('token')
      .where('token."resetPasswordToken" = :token', { token: args.token })
      .innerJoinAndSelect('token.user', 'user')
      .getOne();
    if (!token) {
      throw new UserError(
        'Your link does not exist. Please request password change again.',
      );
    }
    const user = token.user;

    const isExpired =
      new Date().getTime() >
      new Date(token.resetPasswordExpires as string).getTime();
    if (isExpired) {
      throw new UserError(
        'Your link is expired. Please request password change again.',
      );
    }
    token.resetPasswordExpires = null;
    token.resetPasswordToken = null;
    user.password = args.newPassword;
    await this.usersRepository.save(user);
    return true;
  }

  async verifyEmail(args: VerifyEmailMutationVariables): Promise<boolean> {
    const token = await this.tokenRepository
      .createQueryBuilder('token')
      .where('token.verifyEmailToken = :token', { token: args.token })
      .innerJoinAndSelect('token.user', 'user')
      .getOne();
    if (!token) {
      throw new UserError(
        'Your link is not valid. Please concact administrator.',
      );
    }
    const user = token.user;

    if (user.emailVerified) {
      throw new UserError('This email is already verified');
    }

    const isExpired =
      new Date().getTime() >
      new Date(token.verifyEmailExpires as string).getTime();
    if (isExpired) {
      throw new UserError(
        'Your link is expired. Please contact administrator.',
      );
    }
    token.verifyEmailExpires = null;
    token.verifyEmailToken = null;

    user.emailVerified = true;
    await this.usersRepository.save(user);
    const url = `${this.configService.get('LOGIN_AUTH_LINK')}`;

    this.emailService.sendEmail<EmailType.BUILDER_SIGNUP>(
      user.email,
      EmailType['BUILDER_SIGNUP'],
      {
        username: user.name,
        email: user.email,
        password: user.password,
        url: url,
      },
    );

    return true;
  }

  async tokenLogin(ctx: any, token: string) {
    const tokenData = await this.tokenRepository
      .createQueryBuilder('token')
      .innerJoinAndSelect('token.user', 'user')
      .innerJoinAndSelect('user.role', 'role')
      .where('token."builderLoginToken" = :token', { token })
      .getOne();

    if (!tokenData) {
      throw new UserError('Invalid token.');
    }

    const user = tokenData.user;
    const addedDataToUser = {
      ...user,
      getRole() {
        return this.role.name;
      },
      hasRole(role: RoleType) {
        return this.role.name === role;
      },
    };
    ctx.login(addedDataToUser);
    return user;
  }
}
