import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UiSharedModule } from '@dfobobcat/ui/shared/module';
import { RestorePasswordPage } from './restore-password.page';
import { RestorePasswordRoutingModule } from './restore-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UiSharedModule,
    RestorePasswordRoutingModule,
  ],
  declarations: [RestorePasswordPage],
})
export class RestorePasswordModule {}
