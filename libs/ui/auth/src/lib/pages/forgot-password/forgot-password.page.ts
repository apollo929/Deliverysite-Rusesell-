import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordGQL } from '@dfobobcat/graphql-types';
import { AlertService } from '@dfobobcat/ui/shared/service';

@Component({
  selector: 'bc-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private forgotPasswordGQL: ForgotPasswordGQL,
    private alertService: AlertService,
  ) {}

  submit() {
    this.forgotPasswordGQL
      .mutate({
        email: this.form.value.email,
      })
      .subscribe(() => {
        this.alertService
          .show({
            message: 'Restore email sent, please check your mailbox.',
          })
          .subscribe();
      });
  }
}
