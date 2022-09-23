import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleJobPage } from './single-job.page';

const routes: Routes = [
  {
    path: '',
    component: SingleJobPage,
  },
  {
    path: ':id',
    component: SingleJobPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleJobPageRoutingModule {}
