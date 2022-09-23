import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { GraphqlService } from './graphql/graphql.service';
import {
  AuthModule,
  ClaimAuthGuard,
  GuardService,
  LogInWithCredentialsGuard,
} from '@dfobobcat/api/auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JobModule } from '@dfobobcat/api/feature/job';
import { ClockingModule } from '@dfobobcat/api/feature/clocking';
import { EquipmentModule } from '@dfobobcat/api/feature/equipment';
import { UserService } from '@dfobobcat/api/shared/service';
import { ApiAdminModule } from '@dfobobcat/api/feature/admin';
import { ApiReportModule } from '@dfobobcat/api/feature/report';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiEmailModule } from '@dfobobcat/api/email';
import { BullModule } from '@nestjs/bull';
import * as Joi from '@hapi/joi';
import { Logger } from 'winston';

import {
  AdminResolver,
  EquipmentResolver,
  UserResolver,
  UserTypeResolver,
  ClockingResolver,
  JobResolver,
  BuilderResolver,
  StaffResolver,
  CompanyResolver,
} from '@dfobobcat/api/resolver';
import { CronService } from '@dfobobcat/api/cron';
import { ApiSettingsModule } from '@dfobobcat/api/feature/settings';
import {
  UserSubscriber,
  ClockIn,
  ClockOff,
  Job,
  Equipment,
  User,
  Role,
} from '@dfobobcat/api/entity';
import { ApiSharedModule } from '@dfobobcat/api/shared/module';
import { SettingsResolver, ReportResolver } from '@dfobobcat/api/resolver';
import { WinstonModule, WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { WinstonConfigService } from './logging/logging-config.service';
import { CompanyModule } from '../../../company/src';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number(),
        APP_ENV: Joi.string().required(),
        APP_PORT: Joi.number().required(),
        APP_HOST: Joi.string().required(),
        APP_LOCALE_CODE: Joi.string().required(),
        APP_TIMEZONE: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        SESSION_SECRET: Joi.string().required(),
        APP_ROOT_PATH: Joi.string().required(),
        UPLOADS_PATH: Joi.string().required(),
        SYSTEM_FONT: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        ALLOWED_ORIGINS: Joi.string().required(),
        ADMIN_EMAIL: Joi.string().required(),
        EMAIL_DIR: Joi.string().required(),
        VERIFY_EMAIL_TOKEN_EXPIRE: Joi.string().required(),
        RESET_PASSWORD_TOKEN_EXPIRE: Joi.string().required(),
        LOGIN_TOKEN_EXPIRE: Joi.string().required(),
        RESTORE_PASSWORD_URL: Joi.string().required(),
        VERIFY_EMAIL_URL: Joi.string().required(),
        LOGIN_EDIT_JOB_LINK: Joi.string().required(),
        LOG_FILE_PATH: Joi.string().required(),
        EMAIL_HOST: Joi.string().required(),
        EMAIL_PORT: Joi.number().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: configService.get('POSTGRESQL_SYNC') ? true : false,
        entities: [join(__dirname, 'entity', 'src', 'lib', '*.entity.{ts,js}')],
        subscribers: [
          join(
            __dirname,
            'entity',
            'src',
            'lib',
            'event-subscriber',
            '*.{ts,js}',
          ),
        ],
        autoLoadEntities: true,
        useNewUrlParser: true,
        keepConnectionAlive: true,
        logging: false,
      }),
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([ClockIn, ClockOff, Job, Equipment, User, Role]),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule, AuthModule, WinstonModule],
      inject: [ConfigService, UserService],
      useClass: GraphqlService,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    ScheduleModule.forRoot(),
    AuthModule,
    JobModule,
    ClockingModule,
    EquipmentModule,
    ApiAdminModule,
    ApiReportModule,
    ApiEmailModule,
    ApiSettingsModule,
    ApiSharedModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [
    UserSubscriber,
    AdminResolver,
    EquipmentResolver,
    UserResolver,
    UserTypeResolver,
    SettingsResolver,
    ClockingResolver,
    JobResolver,
    BuilderResolver,
    GuardService,
    StaffResolver,
    ReportResolver,
    LogInWithCredentialsGuard,
    CronService,
    CompanyResolver,
    {
      provide: APP_GUARD,
      useFactory: (reflector, guardService) => {
        return new ClaimAuthGuard(reflector, guardService);
      },
      inject: [Reflector, GuardService],
    },
  ],
  exports: [ConfigModule],
})
export class CoreModule {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this.logger.info('Application startup');
    this.logger.info('Timezone ' + process.env.TZ);
    this.logger.info('Timezone shift ' + new Date().getTimezoneOffset());
  }
}
