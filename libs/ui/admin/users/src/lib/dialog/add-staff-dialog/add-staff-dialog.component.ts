import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  OnDestroy,
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
  RegisterGQL,
  StaffRolesGQL,
  UpdateUserGQL,
  UserGQL,
} from '@dfobobcat/graphql-types';
import { map, takeUntil } from 'rxjs/operators';
import {
  AlertService,
  PasswordGeneratorService,
} from '@dfobobcat/ui/shared/service';

function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
const repeatPasswordValidator = () => (
  group: AbstractControl,
): ValidationErrors | null => {
  const pass = group.get('password')?.value;
  const confirmPass = group.get('repeatPassword')?.value;

  return pass === confirmPass ? null : { repeatPassword: true };
};

@Component({
  selector: 'dfobobcat-add-staff-dialog',
  templateUrl: './add-staff-dialog.component.html',
  styleUrls: ['./add-staff-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddStaffDialogComponent implements OnInit, OnDestroy {
  close = new Subject<boolean>();
  passwordType = 'password';
  showPassword = false;
  selectedRoleId!: number;
  form: FormGroup;
  roles$!: Observable<Record<number, string>>;

  copyPasswordText$ = new BehaviorSubject('copy password');
  showCopyPassword$ = new BehaviorSubject(false);
  destroy$ = new Subject();

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
  ) {
    this.form = fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        role: ['', [Validators.required]],
        password: [],
        repeatPassword: [],
      },
      { validator: repeatPasswordValidator() },
    );
  }
  roleSelected(selected: number[]) {
    this.selectedRoleId = selected[0];
  }
  get role() {
    return this.form.controls.role as FormControl;
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
  ngOnInit(): void {
    this.roles$ = this.staffRolesGQL.fetch().pipe(
      map((data) => {
        const roles: Record<number, string> = {};
        for (const role of data.data.staffRoles) {
          roles[role.id] = capitalizeFirstLetter(role.name);
        }
        return roles;
      }),
    );
    if (this.dialogData.staffId) {
      this.userGQL
        .fetch({
          id: this.dialogData.staffId,
        })
        .subscribe((data) => {
          const { role, ...userForm } = data.data.user;
          this.form.patchValue({
            role: capitalizeFirstLetter(role.name),
            ...userForm,
          });
          this.roleSelected([role.id]);
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
        name: formData.name,
        email: formData.email,
        roleId: this.selectedRoleId,
        userId: this.dialogData.staffId,
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
        name: formData.name,
        email: formData.email,
        roleId: this.selectedRoleId,
        password: formData.password,
      };
      updateData.roleId = this.selectedRoleId;
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
    const selBox = document.createElement('textarea');
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
    this.copyPasswordText$.next('Done!');
  }
}
