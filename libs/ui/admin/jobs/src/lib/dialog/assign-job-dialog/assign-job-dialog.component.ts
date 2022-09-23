import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Inject,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AssignToJobGQL, UsersGQL, UsersQuery } from '@dfobobcat/graphql-types';
import { FormControl } from '@angular/forms';
import {
  AssignStaffDialogConifg,
  ASSIGN_STAFF_DIALOG_CONFIG,
} from '@dfobobcat/ui/feature/admin/shared/model';
@Component({
  selector: 'bc-assign-job-dialog',
  templateUrl: './assign-job-dialog.component.html',
  styleUrls: ['./assign-job-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignJobDialogComponent implements OnInit {
  close = new Subject<boolean>();
  staff$ = new BehaviorSubject<UsersQuery['users']['items']>([]);
  assignTo: Record<number, FormControl> = {};

  @Input()
  jobId: number | undefined;

  constructor(
    private usersGQL: UsersGQL,
    private assignToJobGQL: AssignToJobGQL,
    @Inject(ASSIGN_STAFF_DIALOG_CONFIG)
    public dialogData: AssignStaffDialogConifg,
  ) {}

  ngOnInit(): void {
    this.getStaff();
  }

  getStaff() {
    this.usersGQL
      .fetch({
        role: 'staff',
      })
      .subscribe((result) => {
        const staff = result.data.users.items;
        for (const user of staff) {
          this.assignTo[user.id] = new FormControl(false);
        }
        this.staff$.next(staff);
      });
  }

  assignStaff() {
    const users = Object.keys(this.assignTo)
      .filter((key: string) => {
        const idx = +key;
        return this.assignTo[idx].value;
      })
      .map((item) => +item);
    this.assignToJobGQL
      .mutate({
        input: {
          jobId: this.dialogData.jobId,
          staffIds: users,
        },
      })
      .subscribe(() => {
        this.close.next(true);
      });
  }
}
