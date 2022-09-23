import { Injectable } from '@angular/core';
import { Equipment } from '@dfobobcat/api/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
  ) {}

  async getEquipment() {
    return await this.equipmentRepository.find();
  }
}
