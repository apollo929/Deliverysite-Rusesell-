import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import * as moment from 'moment';
import { Job, JobStatus, CancelJobGQL } from '@dfobobcat/graphql-types';
import { Router } from '@angular/router';

@Component({
  selector: 'bc-job-card-staff',
  templateUrl: './job-card-staff.component.html',
  styleUrls: ['./job-card-staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCardStaffComponent {
  @Input() job!: Job;
  @Input() index!: number;
  jobStatus = JobStatus;

  @Output()
  clockIn = new EventEmitter();

  @Input()
  mode: 'builder' | 'staff' = 'builder';

  constructor(private cancelJobGQL: CancelJobGQL, private router: Router) {}

  @Input()
  @HostBinding('class')
  status = 'cancelled';

  @Output() cancelled = new EventEmitter<number>();

  get equipment() {
    return Array.isArray(this.job.equipment)
      ? this.job.equipment.map((item) => item.name).join(', ')
      : [];
  }

  clockOff(id: number) {
    this.router.navigate(['/staff', 'clock-off', id]);
  }

  goToDirection() {
    this.router.navigate(['/staff', 'job-direction', this.job.id]);
  }

  get date() {
    return moment(this.job.requestDate).utc().format('MMM D, dddd');
  }

  cancelJob() {
    this.cancelJobGQL
      .mutate({
        input: this.job.id,
      })
      .subscribe(() => this.cancelled.emit(this.index));
  }
}
