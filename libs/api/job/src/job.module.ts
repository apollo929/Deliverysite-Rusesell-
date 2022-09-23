import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobService } from './lib/service/job.service';
import { Job, Equipment, User, ClockIn, ClockOff, Activity } from '@dfobobcat/api/entity';
import { ConfigModule } from '@nestjs/config';
import { StaffJobService } from './lib/service/staff-job.service';
import { BuilderJobService } from './lib/service/builder-job.service';
import { ApiSharedModule } from '@dfobobcat/api/shared/module';
import { ApiEmailModule } from '@dfobobcat/api/email';
@Module({
  imports: [
    TypeOrmModule.forFeature([ClockIn, ClockOff, Job, Equipment, User, Activity]),
    ConfigModule,
    ApiSharedModule,
    ApiEmailModule,
    ApiSharedModule,
  ],
  providers: [JobService, StaffJobService, BuilderJobService],
  exports: [JobService, StaffJobService, BuilderJobService],
})
export class JobModule {}
