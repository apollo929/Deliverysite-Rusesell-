import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminJobsComponent } from './components/admin-jobs/admin-jobs.component';

const routes: Routes = [
  {
    path: '',
    component: AdminJobsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiAdminJobsRoutingModule {}
