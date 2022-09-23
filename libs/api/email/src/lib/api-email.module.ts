import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './service/email.service';

@Module({
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
  imports: [ConfigModule],
})
export class ApiEmailModule {}
