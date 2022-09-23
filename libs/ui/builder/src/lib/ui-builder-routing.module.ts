import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'builder',
    children: [
      { path: '', redirectTo: 'jobs', pathMatch: 'full' },
      {
        path: 'single-job',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/single-job/single-job.module').then(
                (m) => m.SingleJobPageModule,
              ),
          },
        ],
      },
      {
        path: 'jobs',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/jobs/jobs.module').then((m) => m.JobsPageModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiBuilderRoutingModule {}
