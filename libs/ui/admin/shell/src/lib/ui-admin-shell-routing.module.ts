import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminShellComponent } from './components/admin-shell/admin-shell.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminShellComponent,
    children: [
      { path: '', redirectTo: 'jobs', pathMatch: 'full' },
      {
        path: 'jobs',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../../jobs/src/lib/ui-admin-jobs.module').then(
                (m) => m.UiAdminJobsModule,
              ),
          },
        ],
      },
      {
        path: 'reports',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../../report/src/lib/report.module').then(
                (m) => m.ReportModule,
              ),
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../../users/src/lib/ui-admin-users.module').then(
                (m) => m.UiAdminUsersModule,
              ),
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
export class UIAdminShellRoutingModule {}
