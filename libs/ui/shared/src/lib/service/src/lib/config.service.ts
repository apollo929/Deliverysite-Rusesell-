import { Injectable } from '@angular/core';

interface EnvConfig {
  beGraphqlUrl: string;
  beUrl: string;
  production: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private _config: Record<string, any> = {};
  init(config: Record<string, any>) {
    this._config = config;
  }

  get(key: keyof EnvConfig) {
    return this._config[key];
  }
}
