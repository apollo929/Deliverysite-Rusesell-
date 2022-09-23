import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserBuilderComponent } from './components/admin-user-builder/admin-user-builder.component';
import { AdminUserStaffComponent } from './components/admin-user-staff/admin-user-staff.component';
import { AdminUserTabsComponent } from './components/admin-user-tabs/admin-user-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUserTabsComponent,
    children: [
      { path: '', redirectTo: 'staff', pathMatch: 'full' },
      {
        path: 'staff',
        component: AdminUserStaffComponent,
      },
      {
        path: 'builder',
        component: AdminUserBuilderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiAdminUsersRoutingModule {}
