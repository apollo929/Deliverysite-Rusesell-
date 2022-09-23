import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as winston from 'winston';
import { format, transports } from 'winston';

@Injectable()
export class WinstonConfigService {
  constructor(private configService: ConfigService) {}
  async createWinstonModuleOptions() {
    return {
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(
          (info) =>
            `${info.timestamp} ${info.level}: ${JSON.stringify(info)}` +
            (info.splat !== undefined ? `${info.splat}` : ' '),
        ),
      ),
      transports: [
        new transports.File({
          filename: this.configService.get('LOG_FILE_PATH'),
        }),
        new transports.Console(),
      ],
    };
  }
}
