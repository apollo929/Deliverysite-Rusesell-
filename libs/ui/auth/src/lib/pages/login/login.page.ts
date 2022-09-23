import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginGQL, RoleType } from '@dfobobcat/graphql-types';
import { StateService } from '@dfobobcat/ui/shared/service';
import { User } from '@dfobobcat/ui/shared/model';
@Component({
  selector: 'bc-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  form: FormGroup;

  passwordType = 'password';
  showPassword = false;

  constructor(
    private loginGQL: LoginGQL,
    private fb: FormBuilder,
    private router: Router,
    private state: StateService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      for (const key of Object.keys(this.form.controls)) {
        this.form.controls[key].markAsDirty();
      }
      return;
    }
    const input = this.form.value;
    this.loginGQL
      .mutate({
        input,
      })
      .subscribe((result) => {
        console.log('111111111111111');
        if (result.data?.login) {
          const { name, email } = result.data?.login;
          const role = result.data?.login.role.name;
          const user: User = {
            name,
            role: role,
            email,
          };
          this.state.setState('user', user, true).subscribe();
          if (role === RoleType.Laborer || role === RoleType.Operator) {
            this.router.navigate(['/staff', 'jobs']);
          } else if (role === RoleType.Builder) {
            this.router.navigate(['/builder', 'jobs']);
          } else if (role === RoleType.Admin) {
            this.router.navigate(['/admin']);
          }
        }
        // TODO: show error
      });
  }
  switchPasswordVisible() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.showPassword = !this.showPassword;
  }
}
