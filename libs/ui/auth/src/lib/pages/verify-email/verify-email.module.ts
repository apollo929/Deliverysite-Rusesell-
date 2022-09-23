import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UiSharedModule } from '@dfobobcat/ui/shared/module';
import { VerifyEmailRoutingModule } from './verify-email-routing.module';
import { VerifyEmailPage } from './verify-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UiSharedModule,
    VerifyEmailRoutingModule,
  ],
  declarations: [VerifyEmailPage],
})
export class VerifyEmailModule {}
