import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { UiAdminUsersRoutingModule } from './ui-admin-users-routing.module';
import { UiSharedModule } from '@dfobobcat/ui/shared/module';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { AddStaffDialogComponent } from './dialog/add-staff-dialog/add-staff-dialog.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { AdminUserBuilderComponent } from './components/admin-user-builder/admin-user-builder.component';
import { AdminUserStaffComponent } from './components/admin-user-staff/admin-user-staff.component';
import { AdminUserTabsComponent } from './components/admin-user-tabs/admin-user-tabs.component';
import { AddBuilderDialogComponent } from './dialog/add-builder-dialog/add-builder-dialog.component';
import { UiAdminSharedModule } from '@dfobobcat/ui/feature/admin/shared/module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    UiAdminUsersRoutingModule,
    UiSharedModule,
    ReactiveFormsModule,
    CdkTableModule,
    OverlayModule,
    UiAdminSharedModule,
  ],
  declarations: [
    AdminUserTabsComponent,
    AdminUserStaffComponent,
    AdminUserBuilderComponent,
    AddStaffDialogComponent,
    AddBuilderDialogComponent,
  ],
})
export class UiAdminUsersModule {}
