import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClockIn,
  ClockOff,
  Job,
  Equipment,
  User,
  Role,
} from '@dfobobcat/api/entity';
import { ReportService } from './service/report.service';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([ClockIn, ClockOff, Job, Equipment, User, Role]),
  ],
  providers: [ReportService],
  exports: [ReportService],
})
export class ApiReportModule {}
