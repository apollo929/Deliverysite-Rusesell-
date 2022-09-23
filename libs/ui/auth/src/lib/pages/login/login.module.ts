import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { UiSharedModule } from '@dfobobcat/ui/shared/module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    UiSharedModule,

    HttpClientModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
