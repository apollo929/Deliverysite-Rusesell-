import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  AddStaffDialogConfig,
  ADD_STAFF_DIALOG_CONFIG,
} from '@dfobobcat/ui/feature/admin/shared/model';
import {
  CompaniesGQL,
  CompaniesQuery,
  RegisterGQL,
  StaffRolesGQL,
  UpdateUserGQL,
  UserGQL,
} from '@dfobobcat/graphql-types';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import {
  AlertService,
  PasswordGeneratorService,
} from '@dfobobcat/ui/shared/service';

function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
const repeatPasswordValidator =
  () =>
  (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('repeatPassword')?.value;

    return pass === confirmPass ? null : { repeatPassword: true };
  };

@Component({
  selector: 'dfobobcat-add-builder-dialog',
  templateUrl: './add-builder-dialog.component.html',
  styleUrls: ['./add-builder-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBuilderDialogComponent implements OnInit {
  close = new Subject<boolean>();
  passwordType = 'password';
  showPassword = false;
  selectedCompanyId!: number;
  form: FormGroup;
  roles$!: Observable<Record<number, string>>;
  copyPasswordText$ = new BehaviorSubject('copy password');
  showCopyPassword$ = new BehaviorSubject(false);
  destroy$ = new Subject();
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
    @Inject(ADD_STAFF_DIALOG_CONFIG)
    public dialogData: AddStaffDialogConfig,
    private userGQL: UserGQL,
    private staffRolesGQL: StaffRolesGQL,
    private updateUserGQL: UpdateUserGQL,
    private registerGQL: RegisterGQL,
    private alertService: AlertService,
    private passwordGenerator: PasswordGeneratorService,
    private companiesGql: CompaniesGQL,
  ) {
    this.form = fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: [],
        repeatPassword: [],
        company: ['', [Validators.required]],
      },
      { validator: repeatPasswordValidator() },
    );
  }

  get company() {
    return this.form.controls.company as FormControl;
  }
  companySelected(selected: number[]) {
    //...
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
  ngOnInit(): void {
    if (this.dialogData.staffId) {
      this.userGQL
        .fetch({
          id: this.dialogData.staffId,
        })
        .subscribe((data) => {
          const { role, company, ...userForm } = data.data.user;
          this.form.patchValue({
            company: company?.name,
            ...userForm,
          });
        });
    } else {
      const password = this.passwordGenerator.generate();
      this.showCopyPassword$.next(true);
      this.form.controls.password.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.copyPasswordText$.next('copy password'));

      this.form.controls.password.setValidators([Validators.required]);
      this.form.controls.repeatPassword.setValidators([Validators.required]);
      this.form.patchValue({
        password,
        repeatPassword: password,
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      for (const key of Object.keys(this.form.controls)) {
        this.form.controls[key].markAsDirty();
      }
      return;
    }
    const formData = this.form.value;
    if (this.dialogData.staffId) {
      const updateData = {
        email: formData.email,
        name: formData.name,
        userId: this.dialogData.staffId as number,
        company: formData.company,
      };
      this.updateUserGQL
        .mutate({
          input: updateData,
        })
        .subscribe(() => {
          this.close.next(true);
        });
    } else {
      if (this.form.hasError('repeatPassword')) {
        return;
      }
      const updateData = {
        email: formData.email,
        name: formData.name,
        userId: this.dialogData.staffId,
        company: formData.company,
        password: formData.password,
        roleId: 1,
      };
      this.registerGQL
        .mutate({
          input: updateData,
        })
        .subscribe(() => {
          this.close.next(true);
        });
    }
  }
  switchPasswordVisible() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.showPassword = !this.showPassword;
  }

  copyPassword() {
    this.alertService
      .show({
        type: 'error',
        message: 'Passwords do not match!',
      })
      .subscribe();
    /* const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.innerText = this.form.controls.password.value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copyPasswordText$.next('Done!'); */
  }
}
