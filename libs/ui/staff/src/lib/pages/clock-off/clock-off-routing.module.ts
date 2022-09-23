import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClockOffPage } from './clock-off.page';

const routes: Routes = [
  {
    path: '',
    component: ClockOffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClockOffPageRoutingModule {}
