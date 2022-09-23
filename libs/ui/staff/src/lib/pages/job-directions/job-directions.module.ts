import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobDirectionsPageRoutingModule } from './job-directions-routing.module';

import { JobDirectionsPage } from './job-directions.page';
import { UiSharedModule } from '@dfobobcat/ui/shared/module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobDirectionsPageRoutingModule,
    UiSharedModule,
  ],
  declarations: [JobDirectionsPage],
})
export class JobDirectionsPageModule {}
