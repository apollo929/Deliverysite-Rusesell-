import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'staff',
    children: [
      { path: '', redirectTo: 'jobs', pathMatch: 'full' },
      {
        path: 'jobs',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/staff-jobs/staff-jobs.module').then(
                (m) => m.StaffJobsPageModule,
              ),
          },
        ],
      },
      {
        path: 'clock-off/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/clock-off/clock-off.module').then(
                (m) => m.ClockOffPageModule,
              ),
          },
        ],
      },
      {
        path: 'clock-in/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/clock-in/clock-in.module').then(
                (m) => m.ClockInPageModule,
              ),
          },
        ],
      },
      {
        path: 'job-direction/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/job-directions/job-directions.module').then(
                (m) => m.JobDirectionsPageModule,
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'clock-in',
    loadChildren: () =>
      import('./pages/clock-in/clock-in.module').then(
        (m) => m.ClockInPageModule,
      ),
  },
  /*   {
    path: 'job-directions',
    loadChildren: () => import('./pages/job-directions/job-directions.module').then( m => m.JobDirectionsPageModule)
  },
  {
    path: 'clock-off',
    loadChildren: () => import('./pages/clock-off/clock-off.module').then( m => m.ClockOffPageModule)
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiStaffRoutingModule {}
