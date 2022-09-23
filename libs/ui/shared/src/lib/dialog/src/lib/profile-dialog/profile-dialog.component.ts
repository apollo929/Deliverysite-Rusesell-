import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { LogoutGQL, UpdateMyAccountGQL } from '@dfobobcat/graphql-types';
import { concatMap, finalize, take } from 'rxjs/operators';
import { AlertService, StateService } from '@dfobobcat/ui/shared/service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

const repeatPasswordValidator =
  () =>
  (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('repeatPassword')?.value;

    return pass === confirmPass ? null : { repeatPassword: true };
  };

@Component({
  selector: 'bc-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileDialogComponent implements OnInit {
  form!: FormGroup;
  passwordType = 'password';
  showPassword = false;
  @Input() modal!: HTMLIonModalElement;
  constructor(
    private logoutGQL: LogoutGQL,
    private router: Router,
    private state: StateService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private updateMyAccountGQL: UpdateMyAccountGQL,
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(8)]],
        repeatPassword: [''],
      },
      { validator: repeatPasswordValidator() },
    );
    this.state
      .select((state) => state.user)
      .subscribe((user) => {
        if (user) {
          this.form.patchValue(user);
        }
      });
  }

  onSubmit() {
    if (this.form.hasError('repeatPassword')) {
      this.alertService
        .show({
          type: 'error',
          message: 'Passwords do not match!',
        })
        .subscribe();
      return;
    }
    if (this.form.invalid) {
      for (const key of Object.keys(this.form.controls)) {
        this.form.controls[key].markAsDirty();
      }
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repeatPassword, ...input } = this.form.value;
    if (!input.password || !input.password.length) {
      delete input.password;
    }
    this.updateMyAccountGQL
      .mutate({
        ...input,
      })
      .subscribe((result) => {
        if (!result.data) {
          return;
        }
        const { name, email } = result.data.updateMyAccount;
        const newUser = {
          name,
          email,
        };
        this.state
          .select((state) => state.user)
          .pipe(
            take(1),
            concatMap((oldUser) => {
              if (oldUser) {
                const update = {
                  ...newUser,
                  role: oldUser?.role,
                };
                return this.state.setState('user', update, true);
              }
              return of(undefined);
            }),
          )
          .subscribe();
        this.alertService
          .show({
            message: 'Your data has been updated!',
          })
          .subscribe();
      });
  }

  logout() {
    this.logoutGQL
      .mutate()
      .pipe(
        concatMap(() => this.dismissModal()),
        finalize(() => {
          this.close();
          this.state.setState('user', undefined, true).subscribe();
        }),
      )
      .subscribe(() => {});
  }
  close() {
    this.dismissModal().subscribe();
  }
  switchPasswordVisible() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.showPassword = !this.showPassword;
  }
  private dismissModal(): Observable<boolean> {
    return from(this.modal.dismiss());
  }
}
