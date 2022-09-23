import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from '@dfobobcat/api/entity';
import { ConfigModule } from '@nestjs/config';
import { EquipmentService } from './service/equipment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment]), ConfigModule],
  providers: [EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule {}
