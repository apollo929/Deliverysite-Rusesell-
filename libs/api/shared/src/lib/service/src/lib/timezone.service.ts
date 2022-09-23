import { Injectable } from '@angular/core';
import { ConfigService } from '@nestjs/config';
import { format } from 'date-fns-tz';

@Injectable()
export class TimeZoneService {
  timezone: string;
  locale: string;
  constructor(private config: ConfigService) {
    this.timezone = this.config.get('APP_TIMEZONE') || 'Australia/Melbourne';
    this.locale = this.config.get('APP_LOCALE_CODE') || 'Australia/Melbourne';
  }

  convertToTZ(date: Date, displayTime = false) {
    let options: Intl.DateTimeFormatOptions = {};
    if (displayTime) {
      options = {
        timeZone: 'Australia/Melbourne',
        year: 'numeric',
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
    } else {
      options = {
        timeZone: 'Australia/Melbourne',
        year: 'numeric',
        day: '2-digit',
        month: '2-digit',
      };
    }

    const formatter = new Intl.DateTimeFormat(this.locale, options);
    const formartedDate = formatter.format(date);
    return `${formartedDate.split('/')[1]}/${formartedDate.split('/')[0]}/${
      formartedDate.split('/')[2]
    }`;
  }
}
