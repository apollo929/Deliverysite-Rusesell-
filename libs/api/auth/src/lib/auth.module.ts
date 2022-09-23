import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClockIn,
  ClockOff,
  Equipment,
  Activity,
  Job,
  Role,
  User,
  Token,
  Company,
} from '@dfobobcat/api/entity';
import { AuthService, UserService } from '@dfobobcat/api/shared/service';
import { AuthResolver } from './resolver/auth.resolver';
import { LocalStrategy } from './service/graphql-local.strategy';
import { LocalSerializer } from './service/local.serializer';
import { ConfigModule } from '@nestjs/config';
import { ApiEmailModule } from '@dfobobcat/api/email';
import { CompanyModule } from '@dfobobcat/api/feature/company';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClockIn,
      ClockOff,
      Job,
      Equipment,
      Activity,
      User,
      Role,
      Token,
      Company,
    ]),
    ConfigModule,
    ApiEmailModule,
    forwardRef(() => CompanyModule),
  ],
  controllers: [],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    UserService,
    LocalSerializer,
  ],
  exports: [UserService, AuthService],
})
export class AuthModule {}
