import { Resolver, Query } from '@nestjs/graphql';


import { RequireClaim } from '@dfobobcat/api/auth';
import { Claim } from '@dfobobcat/api/shared/const';
import { SettingsService } from '@dfobobcat/api/feature/settings';
@Resolver()
export class SettingsResolver {
  constructor(private settingsService: SettingsService) {}

  @Query()
  @RequireClaim(Claim.Authenticated)
  async settings() {
    return this.settingsService.getSettings();
  }
}
