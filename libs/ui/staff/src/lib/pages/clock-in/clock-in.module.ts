import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClockInPageRoutingModule } from './clock-in-routing.module';

import { ClockInPage } from './clock-in.page';
import { UiSharedModule } from '@dfobobcat/ui/shared/module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClockInPageRoutingModule,
    UiSharedModule,
    ReactiveFormsModule,
  ],
  providers: [Geolocation],
  declarations: [ClockInPage],
})
export class ClockInPageModule {}
