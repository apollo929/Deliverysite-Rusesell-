import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UIAdminShellRoutingModule } from './ui-admin-shell-routing.module';
import { UiSharedModule } from '@dfobobcat/ui/shared/module';

import { IonicModule } from '@ionic/angular';
import { AdminShellComponent } from './components/admin-shell/admin-shell.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    UIAdminShellRoutingModule,
    UiSharedModule,
  ],
  declarations: [AdminShellComponent],
})
export class UiAdminShellModule {}
