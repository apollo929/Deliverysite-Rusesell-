import { Query, Resolver } from '@nestjs/graphql';
import { EquipmentService } from '@dfobobcat/api/feature/equipment';
import { Claim } from '@dfobobcat/api/shared/const';
import { RequireClaim } from '@dfobobcat/api/auth';

@Resolver()
export class EquipmentResolver {
  constructor(private equipmentService: EquipmentService) {}
  @Query()
  @RequireClaim(Claim.Authenticated)
  async equipment() {
    return await this.equipmentService.getEquipment();
  }
}
