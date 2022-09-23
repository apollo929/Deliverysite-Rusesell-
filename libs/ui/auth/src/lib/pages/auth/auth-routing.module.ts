import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../login/login.module').then((m) => m.LoginPageModule),
          },
        ],
      },
      {
        path: 'signup',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../signup/signup.module').then((m) => m.SignupPageModule),
          },
        ],
      },
      {
        path: 'forgot-password',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../forgot-password/forgot-password.module').then(
                (m) => m.ForgotPasswordModule,
              ),
          },
        ],
      },
      {
        path: 'restore-password',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../restore-password/restore-password.module').then(
                (m) => m.RestorePasswordModule,
              ),
          },
        ],
      },
      {
        path: 'verify-email',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../verify-email/verify-email.module').then(
                (m) => m.VerifyEmailModule,
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
export class AuthPageRoutingModule {}
