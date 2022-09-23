import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClockOffPageRoutingModule } from './clock-off-routing.module';

import { ClockOffPage } from './clock-off.page';
import { UiSharedModule } from '@dfobobcat/ui/shared/module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ClockOffPageRoutingModule,
    UiSharedModule,
  ],
  declarations: [ClockOffPage],
})
export class ClockOffPageModule {}
