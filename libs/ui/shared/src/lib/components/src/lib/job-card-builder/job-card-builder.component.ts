import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { AlertServiceConfig } from '@dfobobcat/ui/shared/model';
import { AlertController } from '@ionic/angular';

import * as moment from 'moment';
import { Job, JobStatus, CancelJobGQL } from '@dfobobcat/graphql-types';
import { from, Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { concatMap, tap } from 'rxjs/operators';
import { SettingsGQL } from '@dfobobcat/graphql-types';
import { ReplaySubject } from 'rxjs';
import { DatepickerButtonComponent } from '@dfobobcat/ui/shared/component';
import { UpdateJobDateInput, UpdateJobDateGQL } from '@dfobobcat/graphql-types';
import { ConfirmDialogComponent } from '@dfobobcat/ui/shared/dialog';

@Component({
  selector: 'bc-job-card-builder',
  templateUrl: './job-card-builder.component.html',
  styleUrls: ['./job-card-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCardBuilderComponent implements OnInit {
  @Input() job!: Job;
  @Input() index!: number;
  jobStatus = JobStatus;
  minDate$ = new ReplaySubject<moment.Moment>(1);

  @ViewChild(DatepickerButtonComponent)
  datePickerButton!: DatepickerButtonComponent;

  constructor(
    private cancelJobGQL: CancelJobGQL,
    public modalController: ModalController,
    private settingsGQL: SettingsGQL,
    private updateJobDateGQL: UpdateJobDateGQL,
    private alertController: AlertController,
  ) {}

  @Input()
  @HostBinding('class')
  status = 'cancelled';
  modal!: HTMLIonModalElement;

  @Output() cancelled = new EventEmitter<number>();
  @Output() updateJob = new EventEmitter<number>();

  get equipment() {
    return Array.isArray(this.job.equipment)
      ? this.job.equipment.map((item) => item.name).join(', ')
      : [];
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

  ngOnInit(): void {
    this.settingsGQL.fetch().subscribe((settings) => {
      this.minDate$.next(moment(settings.data.settings.minJobRequestDate));
    });
  }

  presentModal() {
    this.datePickerButton.openEditDatePickerDialog();
  }

  updateJobDate(updateDate: string = '') {
    const input: UpdateJobDateInput = {
      requestDate: updateDate,
      updateField: 'requestDate',
      id: this.job.id,
    };
    this.updateJobDateGQL
      .mutate({
        input: input,
      })
      .subscribe(() => {
        this.datePickerButton.closeDatepicker();
        this.updateJob.emit();
      });
  }

  cancleUpdate() {}

  showConfirm() {
    this.alertController
      .create({
        header: 'Confirm',
        message: 'Are you sure you wish to cancel this request?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              console.log('Let me think');
            },
          },
          {
            text: 'Yes',
            handler: () => {
              this.cancelJob();
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }
}
