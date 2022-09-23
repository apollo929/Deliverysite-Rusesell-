import { InjectionToken } from '@angular/core';
export interface ClockOffDialogConfig {
  job: {
    id: number;
    address: string;
    activity: any;
  };
}
export const CLOCKOFF_DIALOG_CONFIG = new InjectionToken<ClockOffDialogConfig>(
  'CLOCKOFF_DIALOG_CONFIG',
);
