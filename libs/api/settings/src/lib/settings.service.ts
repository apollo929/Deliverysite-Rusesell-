import { Injectable } from '@nestjs/common';
import { Settings } from '@dfobobcat/graphql-types';

@Injectable()
export class SettingsService {
  getSettings(): Settings {
    const minJobRequestDate = new Date();
    minJobRequestDate.setDate(minJobRequestDate.getDate() + 0);
    return {
      minJobRequestDate,
    };
  }
}
