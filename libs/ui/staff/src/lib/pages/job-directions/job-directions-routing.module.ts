import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobDirectionsPage } from './job-directions.page';

const routes: Routes = [
  {
    path: '',
    component: JobDirectionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobDirectionsPageRoutingModule {}
