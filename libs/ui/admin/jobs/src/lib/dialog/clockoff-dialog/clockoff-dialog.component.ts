import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  ReplaySubject,
  Observable,
  from,
} from 'rxjs';
import { ModalController } from '@ionic/angular';
import { DatepickerButtonComponent } from '@dfobobcat/ui/shared/component';
import {
  ClockOffsGQL,
  ClockInsGQL,
  ClockOffsQuery,
  ClockInsQuery,
  SettingsGQL,
  UpdateJobDateGQL,
  UpdateJobDateInput,
  CreateJobInput,
  UpdateJobGQL,
  CancelJobGQL,
  JobAssignerGQL,
  JobStaffsGQL,
} from '@dfobobcat/graphql-types';

import {
  ClockOffDialogConfig,
  CLOCKOFF_DIALOG_CONFIG,
} from '@dfobobcat/ui/feature/admin/shared/model';
import { map } from 'rxjs/operators';
import { AssignToJobGQL } from '@dfobobcat/graphql-types';
import * as moment from 'moment';

@Component({
  selector: 'dfobobcat-clockoff-dialog',
  templateUrl: './clockoff-dialog.component.html',
  styleUrls: ['./clockoff-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockoffDialogComponent implements OnInit {
  close = new Subject<void>();
  unassigned = new Subject<boolean>();
  updateRequestDate = new Subject<boolean>();

  $clockOffs = new BehaviorSubject<ClockOffsQuery['job']['clockOffs']>([]);
  $clockIns = new BehaviorSubject<ClockInsQuery['job']['clockIns']>([]);
  assigner = '';
  notes = '';
  jobData: any;
  minDate$ = new ReplaySubject<moment.Moment>(1);
  selectedDate = '';
  modal!: HTMLIonModalElement;
  showDatePicker = false;
  @ViewChild(DatepickerButtonComponent)
  datePickerButton!: DatepickerButtonComponent;
  assignedStaff: string[] = [];
  showNote = false;
  extraNote: any = "";

  constructor(
    private clockOffsGQL: ClockOffsGQL,
    private clockInsGQL: ClockInsGQL,
    private settingsGQL: SettingsGQL,
    public modalController: ModalController,
    private updateJobDateGQL: UpdateJobDateGQL,
    @Inject(CLOCKOFF_DIALOG_CONFIG)
    public dialogData: ClockOffDialogConfig,
    private assignToJobGQL: AssignToJobGQL,
    private updateJobGQL: UpdateJobGQL,
    private cancelJobGQL: CancelJobGQL,
    private jobStaffGQL: JobStaffsGQL
  ) { }

  ngOnInit(): void {

    this.getClockOffs();
    this.getClockIns();
    this.getAssignedStaff();
    this.jobData = this.dialogData;
    console.log(this.jobData);
    this.notes = this.jobData.job.notes;
    this.settingsGQL.fetch().subscribe((settings) => {
      this.minDate$.next(moment(settings.data.settings.minJobRequestDate));
    });
  }

  saveNoteInput(event: any) {
    this.extraNote = event.detail.value;
  }

  async showNoteField() {
    this.showNote = true;

  }


  cancelJob() {
    console.log(this.jobData.job.id);
    this.cancelJobGQL
      .mutate({
        input: parseFloat(this.jobData.job.id),
      })
      .subscribe(() => this.close.next());
  }


  addNote() {
    let mergedNote = "";
    console.log(this.jobData);
    const job = this.jobData.job;
    if (job.notes) {
      mergedNote = job.notes + " | " + this.extraNote;
    } else {
      mergedNote = this.extraNote;
    }
    const jobId = job.id;
    const input: CreateJobInput = {
      address: job.address,
      equipment: job.equipment?.map((item: any) => item.id),
      lng: job.lng,
      lat: job.lat,
      requestDate: job.requestDate,
      notes: mergedNote,
      priority: job.priority ? undefined : '',
    };
    this.showNote = false;
    this.notes = mergedNote;
    this.updateJobGQL
      .mutate(
        {
          input: { ...input, id: jobId },
        },
        {
          context: {
            useMultipart: true,
          },
        },
      )
      .subscribe((data) => {
        this.updateRequestDate.next(true);          //When I add a note to a job, i have to REFRESH the whole page for the note to show, the show should show without refresh
      });
  }

  getAssignedStaff() {
    // this.$clockIns.subscribe(data => {
    //   data.map(clockOff => {
    //     if (!this.assignedStaff.includes(clockOff.staff.name)) {
    //       this.assignedStaff.push(clockOff.staff.name);
    //     }
    //   })
    // })
    this.jobStaffGQL.fetch(({
      id: this.dialogData.job.id
    }))
      .subscribe(result => {
        this.assignedStaff = result.data.job.staff.map(s => s.name);
      })
  }

  printReport() {
    const jobData = this.jobData.job;
    var tableData = document.getElementById('printable')?.innerHTML.toString()!;
    var printWindow = window.open('', 'PRINT', 'height=400,width=600');
    printWindow?.document.write(
      '<html><head><title>' + 'DFOBOBCAT - Job history' + '</title>',
    );
    printWindow?.document.write('<style>* {font-family: sans-serif;}</style>');
    printWindow?.document.write(
      "</head><body style = 'border: 2px solid black;padding:10px;'>",
    );
    printWindow?.document.write(
      "<h1 style = 'text-align:center;padding:10px;border-bottom:2px solid black;'>" +
      'JOB HISTORY' +
      '</h1>',
    );
    printWindow?.document.write(
      "<div style = 'font-size:22px;font-weight:bold;'>" +
      jobData.address +
      '</div>',
    );
    if (jobData.notes != '')
      printWindow?.document.write(
        "<div style = 'font-size:16px;font-weight:300;'>Notes: " +
        jobData.notes +
        '</div>',
      );
    printWindow?.document.write(
      "<div style = 'text-align:center;margin-top:50px;font-weight:bold;font-size:20px;'>Clocks Off</div>",
    );
    printWindow?.document.write(
      "<table style = 'width:100%;border:1px solid black;'>",
    );
    this.$clockOffs.forEach((clock) => {
      clock.forEach((clock2) => {
        printWindow?.document.write(
          "<tr><th style = 'border:1px solid black;'><div style = 'float:left'>" +
          clock2.staff.name +
          '</div></th>',
        );
        printWindow?.document.write(
          "<th style = 'border:1px solid black;'><div style = 'float:right'>" +
          new Date(Number(clock2.clockOffTime)).toUTCString() +
          '</div></th></tr>',
        );
      });
      printWindow?.document.write('</table>');
      printWindow?.document.write(
        "<div style = 'text-align:center;margin-top:50px;font-weight:bold;font-size:20px;'>Activity</div>",
      );
      printWindow?.document.write(
        "<table style = 'width:100%;border:1px solid black;'>",
      );
      for (let activity of this.dialogData.job.activity) {
        printWindow?.document.write(
          "<tr><th style = 'border:1px solid black;'><div style = 'float:left'>" +
          activity.type +
          '</div></th>',
        );
        printWindow?.document.write(
          "<th style = 'border:1px solid black;'><div style = 'float:right'>" +
          new Date(activity.date).toLocaleString() +
          '</div></th></tr>',
        );
      }
      printWindow?.document.write('</table>');
      printWindow?.document.write('</body></html>');
      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();
      printWindow?.close();
      return true;
    });
  }

  getClockOffs() {
    this.clockOffsGQL
      .fetch({
        id: this.dialogData.job.id,
      })
      .subscribe((result) => {
        const clockOffs = result.data.job.clockOffs;
        this.$clockOffs.next(clockOffs);
      });
  }
  getClockIns() {
    this.clockInsGQL
      .fetch({
        id: this.dialogData.job.id,
      })
      .subscribe((result) => {
        const clockIns = result.data.job.clockIns;
        this.$clockIns.next(clockIns);
      });
  }
  unassign() {
    this.assignToJobGQL
      .mutate({
        input: {
          jobId: this.dialogData.job.id,
          staffIds: [],
        },
      })
      .subscribe(() => {
        this.unassigned.next(true);
        this.close.next();
      });
  }
  dateSelected(date: string = '') {
    this.selectedDate = date;
    return;
  }

  openDatePicker() {
    this.showDatePicker = !this.showDatePicker;
    this.showDatePicker
      ? this.datePickerButton.openDatepicker()
      : this.datePickerButton.closeDatepicker();
  }
  updateJobDate(updateDate: string = '') {
    const input: UpdateJobDateInput = {
      requestDate: updateDate,
      updateField: 'requestDate',
      id: this.dialogData.job.id,
    };
    this.updateJobDateGQL
      .mutate({
        input: input,
      })
      .subscribe(() => {
        this.close.next();
        this.updateRequestDate.next(true);
        this.showDatePicker = false;
      });
  }

  cancleUpdate() {
    this.showDatePicker = false;
  }
}
