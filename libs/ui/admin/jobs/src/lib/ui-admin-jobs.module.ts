import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiAdminJobsRoutingModule } from './ui-admin-jobs-routing.module';
import { UiSharedModule } from '@dfobobcat/ui/shared/module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AssignJobDialogComponent } from './dialog/assign-job-dialog/assign-job-dialog.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ClockoffDialogComponent } from './dialog/clockoff-dialog/clockoff-dialog.component';
import { CreateJobsDialogComponent } from './dialog/create-jobs-dialog/create-jobs-dialog.component';
import { AdminJobsComponent } from './components/admin-jobs/admin-jobs.component';
import { ClockoffCardComponent } from './components/clockoff-card/clockoff-card.component';
import { JobAssignedComponent } from './components/job-assigned/job-assigned.component';
import { JobUnassignedComponent } from './components/job-unassigned/job-unassigned.component';
import { OrderSwitcherComponent } from './components/order-switcher/order-switcher.component';
import { UiAdminSharedModule } from '@dfobobcat/ui/feature/admin/shared/module';
import { JobAssignedListComponent } from './components/job-assigned-list/job-assigned-list.component';
import { JobUnassignedListComponent } from './components/job-unassigned-list/job-unassigned-list.component';

@NgModule({
  imports: [
    CommonModule,
    UiAdminJobsRoutingModule,
    UiAdminSharedModule,
    UiSharedModule,
    IonicModule,
    ReactiveFormsModule,
    OverlayModule,
  ],
  declarations: [
    AdminJobsComponent,
    OrderSwitcherComponent,
    JobUnassignedComponent,
    JobAssignedComponent,
    AssignJobDialogComponent,
    ClockoffDialogComponent,
    ClockoffCardComponent,
    CreateJobsDialogComponent,
    JobAssignedListComponent,
    JobUnassignedListComponent,
  ],
})
export class UiAdminJobsModule {}
