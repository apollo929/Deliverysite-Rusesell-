import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UiSharedModule } from '@dfobobcat/ui/shared/module';
import { ForgotPasswordPage } from './forgot-password.page';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UiSharedModule,
    ForgotPasswordRoutingModule,
  ],
  declarations: [ForgotPasswordPage],
})
export class ForgotPasswordModule {}
