import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Claim } from '@dfobobcat/api/shared/const';
import { RequireClaim } from '@dfobobcat/api/auth';
import { CompanyService } from '@dfobobcat/api/feature/company';
import { AddCompanyInput } from '@dfobobcat/graphql-types';

@Resolver()
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}
  @Query()
  @RequireClaim(Claim.PublicMethod)
  async companies() {
    return await this.companyService.getCompanies();
  }

  @Mutation()
  @RequireClaim(Claim.AddCompany)
  async addCompany(@Context() ctx: any, @Args('input') args: AddCompanyInput) {
    return { success: await this.companyService.addCompany(args) };
  }
}
