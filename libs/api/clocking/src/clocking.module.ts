import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClockOff, ClockIn, Job, Equipment, User } from '@dfobobcat/api/entity';
import { ClockingService } from './lib/service/clocking.service';
import { ConfigModule } from '@nestjs/config';
import { ApiSharedModule } from '@dfobobcat/api/shared/module';
import { ApiQueueModule } from '@dfobobcat/api/queue';
import { ImageConsumer } from './lib/service/image.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClockIn, ClockOff, Job, Equipment, User]),
    ConfigModule,
    ApiSharedModule,
    ApiQueueModule,
  ],
  providers: [ClockingService, ImageConsumer],
  exports: [ClockingService],
})
export class ClockingModule {}
