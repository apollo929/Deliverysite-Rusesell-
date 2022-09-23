import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CompaniesGQL, RegisterBuilderGQL } from '@dfobobcat/graphql-types';
import { AlertService } from '@dfobobcat/ui/shared/service';
import { map, tap } from 'rxjs/operators';

const repeatPasswordValidator =
  () =>
  (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('repeatPassword')?.value;

    return pass === confirmPass ? null : { repeatPassword: true };
  };

@Component({
  selector: 'bc-signup-page',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  form: FormGroup;
  passwordType = 'password';
  showPassword = false;
  companies$ = this.companiesGql.fetch().pipe(
    map((data) => data.data?.companies),
    map((items) =>
      items
        ? items.reduce((collection: Record<number, string>, item: any) => {
            collection[item.id] = item.name;

            return collection;
          }, {})
        : {},
    ),
  );

  constructor(
    private fb: FormBuilder,
    private registerGQL: RegisterBuilderGQL,
    private alertService: AlertService,
    private companiesGql: CompaniesGQL,
  ) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', Validators.required],
        company: ['', [Validators.required]],
      },
      { validator: repeatPasswordValidator() },
    );
  }
  get company() {
    return this.form.controls.company as FormControl;
  }

  companySelected(event: any) {
    // ...
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
    this.registerGQL
      .mutate({
        input,
      })
      .pipe(
        tap(() => {
          this.form.reset();
        }),
      )
      .subscribe(() => {
        this.alertService
          .show({
            message:
              'We sent an email with verification link to your email address',
          })
          .subscribe();
      });
  }
  switchPasswordVisible() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.showPassword = !this.showPassword;
  }
}
