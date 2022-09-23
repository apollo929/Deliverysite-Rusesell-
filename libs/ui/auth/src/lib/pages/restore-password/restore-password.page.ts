import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ForgotPasswordGQL,
  RestorePasswordGQL,
} from '@dfobobcat/graphql-types';
import { AlertService } from '@dfobobcat/ui/shared/service';

@Component({
  selector: 'bc-restore-password',
  templateUrl: './restore-password.page.html',
  styleUrls: ['./restore-password.page.scss'],
})
export class RestorePasswordPage implements OnInit {
  token = '';
  form = this.fb.group({
    password: ['', [Validators.required]],
  });
  passwordType = 'password';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private forgotPasswordGQL: ForgotPasswordGQL,
    private restorePasswordGQL: RestorePasswordGQL,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (!params.token) {
        this.router.navigate(['/']);
        return;
      }
      this.token = params.token;
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.restorePasswordGQL
      .mutate({
        token: this.token,
        newPassword: this.form.value.password,
      })
      .subscribe(() => {
        this.router.navigate(['/auth', 'login']);
        this.alertService
          .show({
            message:
              'Successfully updated password. Please log in using new password.',
          })
          .subscribe();
      });
  }
  switchPasswordVisible() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.showPassword = !this.showPassword;
  }
}
