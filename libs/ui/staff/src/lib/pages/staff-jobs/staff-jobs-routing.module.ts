import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffJobsPage } from './staff-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: StaffJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffJobsPageRoutingModule {}
