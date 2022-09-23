import { InjectionToken } from '@angular/core';

export interface AssignStaffDialogConifg {
  jobId: number;
}
export const ASSIGN_STAFF_DIALOG_CONFIG = new InjectionToken<AssignStaffDialogConifg>(
  'ASSIGN_STAFF_DIALOG_CONFIG',
);
