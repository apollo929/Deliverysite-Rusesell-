import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClockIn,
  ClockOff,
  Equipment,
  Job,
  User,
  Role,
  Company,
} from '@dfobobcat/api/entity';
import { AdminService } from './service/admin.service';
import { CompanyModule } from '../../../company/src';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([
      ClockIn,
      ClockOff,
      Job,
      Equipment,
      User,
      Role,
      Company,
    ]),
    CompanyModule,
  ],
  providers: [AdminService],
  exports: [AdminService],
})
export class ApiAdminModule {}
