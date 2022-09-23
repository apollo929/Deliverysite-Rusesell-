import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffJobsPageRoutingModule } from './staff-jobs-routing.module';

import { StaffJobsPage } from './staff-jobs.page';
import { UiSharedModule } from '@dfobobcat/ui/shared/module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TodayJobComponent } from '../../components/today-job/today-job.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffJobsPageRoutingModule,
    UiSharedModule,
    ReactiveFormsModule,
  ],
  declarations: [StaffJobsPage, TodayJobComponent],
  providers: [Geolocation],
})
export class StaffJobsPageModule {}
