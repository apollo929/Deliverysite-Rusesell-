import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

@Module({
  controllers: [],
  providers: [],
  exports: [BullModule],
  imports: [
    BullModule.registerQueue({
      name: 'image',
    }),
  ],
})
export class ApiQueueModule {}
