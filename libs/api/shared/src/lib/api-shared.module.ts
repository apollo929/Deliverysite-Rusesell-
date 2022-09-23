import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClockIn, ClockOff, Equipment, Job, User } from '@dfobobcat/api/entity';
import {
  BuilderUtilService,
  ClockingCommonService,
  TimeZoneService,
} from '@dfobobcat/api/shared/service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClockIn, ClockOff, Job, Equipment, User]),
    ConfigModule,
  ],
  controllers: [],
  providers: [ClockingCommonService, BuilderUtilService, TimeZoneService],
  exports: [ClockingCommonService, BuilderUtilService, TimeZoneService],
})
export class ApiSharedModule {}
