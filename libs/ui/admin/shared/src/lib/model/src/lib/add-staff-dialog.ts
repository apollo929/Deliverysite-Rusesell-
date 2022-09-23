import { InjectionToken } from '@angular/core';

export interface AddStaffDialogConfig {
  staffId: number | undefined;
}
export const ADD_STAFF_DIALOG_CONFIG = new InjectionToken<AddStaffDialogConfig>(
  'ADD_STAFF_DIALOG_CONFIG',
);
