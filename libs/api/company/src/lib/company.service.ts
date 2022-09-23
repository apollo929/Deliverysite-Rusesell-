import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '@dfobobcat/api/entity';
import { AddCompanyInput } from '@dfobobcat/graphql-types';
import { UserError } from '@dfobobcat/api/shared/exception';
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepo: Repository<Company>,
  ) {}

  async getCompanies() {
    return this.companyRepo.find();
  }

  async addCompany(data: AddCompanyInput): Promise<Company> {
    const alreadyExists = await this.companyRepo.findOne({ name: data.name });
    if (alreadyExists) {
      throw new UserError('Already exists.');
    }

    const newItem = await this.companyRepo.save({
      name: data.name,
    });

    return newItem;
  }
}
