import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Injector,
  ElementRef,
  ViewChild,
  Output,
  Input,
  EventEmitter,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  from,
  Observable,
  Subject,
  merge,
} from 'rxjs';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { tap, concatMap, take, last } from 'rxjs/operators';
import { CreateJobsDialogComponent } from '../../dialog/create-jobs-dialog/create-jobs-dialog.component';
import { SearchService } from '@dfobobcat/ui/shared/service';
import { takeUntil } from 'rxjs/operators';
import {
  JobStatus,
  JobsQuery,
  JobsGQL,
  UsersGQL,
} from '@dfobobcat/graphql-types';
import * as moment from 'moment';
import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  ConnectionPositionPair,
} from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ClockoffDialogComponent } from '../../dialog/clockoff-dialog/clockoff-dialog.component';
import { AssignJobDialogComponent } from '../../dialog/assign-job-dialog/assign-job-dialog.component';
import {
  ClockOffDialogConfig,
  CLOCKOFF_DIALOG_CONFIG,
} from '@dfobobcat/ui/feature/admin/shared/model';
import {
  AssignStaffDialogConifg,
  ASSIGN_STAFF_DIALOG_CONFIG,
} from '@dfobobcat/ui/feature/admin/shared/model';

import { CreateJobInput, UpdateJobGQL } from '@dfobobcat/graphql-types';

enum ORDER_DIRECTION {
  DESC = '-',
  ASC = '+',
}
@Component({
  selector: 'dfobobcat-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminJobsComponent {
  hasNextPage$: any;
  hasPreviousPage$: any;
  nextPage: number | undefined;
  previousPage: number | undefined;
  staff: any;
  staffFilter$: BehaviorSubject<undefined | number[]> = new BehaviorSubject<
    undefined | number[]
  >(undefined);
  constructor(
    private jobsGQL: JobsGQL,
    private updateJobGQL: UpdateJobGQL,
    private searchService: SearchService,
    private overlay: Overlay,
    private injector: Injector,
    public modalController: ModalController,
    private cdRef: ChangeDetectorRef,
    private usersGQL: UsersGQL,
    private actionSheetController: ActionSheetController,
  ) {
    this.weekNames = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Firday',
      'Saturday',
      'Sunday',
    ];
    this.updateMonth();
    this.getStaff();
  }
  @ViewChild('jobCard', { read: ElementRef }) cardContentRef!: ElementRef;
  @Output()
  update = new EventEmitter<void>();
  @Input() job!: JobsQuery['jobs']['items'][number];

  updateJobs$ = new BehaviorSubject<undefined>(undefined);
  search$ = new BehaviorSubject<string>('');
  eventType = 'past';
  calendarType = new BehaviorSubject<string>('');
  destroy$ = new Subject();
  modal!: HTMLIonModalElement;
  selectedDate: Date = new Date();
  selectedMonth: number = new Date().getMonth();
  calendar: any[][] = [];
  today: Date = new Date();
  calendarQueryType: string = 'month';
  lastCalendarRangeType = this.calendarQueryType;
  calendarResponse: any = [];
  calendarResponseToShow: any = [];
  monthReponse: any = [];
  weekResponse: any = [];
  weekResponseToShow: any = [];
  dayResponse: any = [];
  dayResponseToShow: any = [];
  week: any[] = [];
  day: any[] = [];
  weekNames: string[] = [];
  dialogRef!: OverlayRef;
  jobId!: number;

  toggleJobs(event: string) {
    this.eventType = event;
    if (event === 'past') {
      this.calendarType.next('');
    } else {
      this.updateMonth();
    }
  }

  searchForItem(search: any) {
    if (this.calendarQueryType === 'month') {
      this.calendarResponseToShow = this.searchItem(search.detail.value, this.calendarResponse);
      this.createArray(false);
    } else if (this.calendarQueryType === 'week') {
      this.weekResponseToShow = this.searchItem(search.detail.value, this.weekResponse);
      this.createWeekArray(false);
    } else if (this.calendarQueryType === 'day') {
      this.dayResponseToShow = this.searchItem(search.detail.value, this.dayResponse);
      this.sortDayByPriority();
    }
  }

  searchItem(searchValue: string, response: any) {
    const response2 = Object.assign(response);
    return response2.filter((job: any) => {
      return job.address.toLowerCase().includes(searchValue);
    })
  }

  calendarJobs(type?: string) {
    if (type) {
      this.lastCalendarRangeType = type;
    }
    if (!type) {
      type = this.lastCalendarRangeType;
    }
    this.calendarQueryType = type;
    if (type === 'week') {
      this.updateWeek();
    }
    if (type === 'day') {
      this.updateDay();
    }
    if (type == 'month') {
      this.updateMonth();
    }

    this.calendarType.next(type);
  }

  async presentModal(): Promise<any> {
    this.showModal().subscribe(data => {
    });
    setTimeout(async () => {
      await this.modal.onDidDismiss().then(() => {
        this.calendarJobs(this.calendarQueryType);
      })
    }, 2000);
  }

  staffFilterApplied(staffId: any) {
    if (!staffId?.length || staffId === '-1') {
      this.staffFilter$.next(undefined);
      this.calendarJobs(this.calendarQueryType);

      return;
    }

    this.staffFilter$.next([+staffId]);
    this.calendarJobs(this.calendarQueryType);
  }

  private showModal(): Observable<void> {
    return from(
      this.modalController.create({
        component: CreateJobsDialogComponent,
        cssClass: 'auto-height',
      }),
    ).pipe(
      takeUntil(this.destroy$),
      tap((modal) => (this.modal = modal)),
      concatMap((modal) => from(modal.present())),
    );
  }

  firstDayOfWeek(weekDate: Date) {
    const day = weekDate.getDay();
    const diff = weekDate.getDate() - day + (day == 0 ? -6 : 1);
    const firstDayOfWeek = new Date(weekDate.setDate(diff));
    return firstDayOfWeek;
  }

  lastDayOfWeek(firstDate: Date) {
    const lastDayOfWeek = new Date(firstDate);
    lastDayOfWeek.setDate(firstDate.getDate() + 6);
    return lastDayOfWeek;
  }

  firstDayOfMonth() {
    const firstDay = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      1,
    );
    return firstDay;
  }

  lastDayOfMonth() {
    const lastDay = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth() + 1,
      0,
    );
    return lastDay;
  }

  firstDayOfCalendar() {
    const firstDay = this.firstDayOfWeek(this.firstDayOfMonth());
    return firstDay;
  }

  lastDayOfCalendar() {
    const lastDay = this.lastDayOfWeek(
      this.firstDayOfWeek(this.lastDayOfMonth()),
    );
    return lastDay;
  }

  async pushInArray(weekDex: number, day: number, month: number) {
    const data = {
      date: day,
      month: month,
    };
    this.calendar[weekDex].push(data);
  }

  createArray(getJobs: boolean) {
    this.calendar = [];
    var day: Date = new Date(this.firstDayOfCalendar());
    const lastDay = this.lastDayOfCalendar();
    lastDay.setDate(lastDay.getDate() + 1);
    var weekDex = 0;
    while (day.valueOf() != lastDay.valueOf()) {
      this.calendar[weekDex] = [];
      for (var i = 0; i < 7; i++) {
        const month = day.getMonth();
        this.pushInArray(weekDex, day.getDate(), day.getMonth());
        day.setDate(day.getDate() + 1);
      }
      weekDex = weekDex + 1;
    }
    if (getJobs) {
      this.getJobs(this.firstDayOfCalendar(), this.lastDayOfMonth(), 'month');
    } else {
      setTimeout(() => {
        this.createMonthElements();
      }, 500);
    }
  }

  nextMonth() {
    this.calendar = [];
    if (this.selectedMonth < 11) {
      this.selectedMonth = this.selectedMonth + 1;
    } else {
      this.selectedMonth = 0;
      this.selectedDate.setFullYear(this.selectedDate.getFullYear() + 1);
    }
    this.updateMonth();
  }

  prevMonth() {
    this.calendar = [];
    if (this.selectedMonth > 0) {
      this.selectedMonth = this.selectedMonth - 1;
    } else {
      this.selectedMonth = 11;
      this.selectedDate.setFullYear(this.selectedDate.getFullYear() - 1);
    }

    this.updateMonth();
  }

  getJobs(startDate: Date, endDate: Date, cType: string) {

    endDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      23, 59, 59, 59
    )
    console.log('cType========', cType);
    console.log('startDate========', startDate);
    console.log('endDate========', endDate);

    if (cType === 'month') {
      this.calendarQueryType = 'month';
    } else if (cType === 'week') {
      this.calendarQueryType = 'week';
    } else {
      this.calendarQueryType = 'day';
      startDate.setDate(startDate.getDate() + 1);
      endDate.setDate(startDate.getDate());
    }

    this.jobsGQL
      .fetch({
        status: [
          JobStatus.Completed,
          JobStatus.InProgress,
          JobStatus.Cancelled,
          JobStatus.Assigned,
          JobStatus.Pending,
          JobStatus.UnAssigned,
        ],
        pagination: {
          page: 0,
          offset: 31,
        },
        filteredDate: {
          startDate,
          endDate,
          calendarType: this.calendarQueryType,
        },
        staff: this.staffFilter$.value,
      })
      .subscribe((result) => {
        const jobs = result.data.jobs;
        const response = jobs.items.map((elem: any) => {
          elem.date = moment(elem.requestDate).utc().date();
          elem.month = moment(elem.requestDate).utc().month();
          elem.jobRequestedDate = moment(elem.requestDate)
            .utc()
            .format('MMM D, dddd');
          return elem;
        });
        console.log(response);
        if (cType === 'month') {
          this.calendarResponse = response;
          this.calendarResponseToShow = response;
          this.calendarQueryType = cType;
          setTimeout(() => {
            this.createMonthElements();
          }, 500);
        } else if (cType === 'week') {
          this.weekResponse = response;
          this.weekResponseToShow = this.weekResponse;
          this.calendarQueryType = cType;
          setTimeout(() => {
            this.createWeekElements();
          }, 500);
        } else {
          this.dayResponse = response;
          this.dayResponseToShow = response;
          this.calendarQueryType = cType;
          setTimeout(() => {
            this.sortDayByPriority();
          }, 5000);
        }
        this.cdRef.detectChanges();
      });
  }

  getStaff() {
    this.usersGQL
      .fetch({
        role: 'staff',
      })
      .subscribe((result) => {
        this.staff = result.data.users.items;
      });
  }

  getJobsOfStaff() {
    //TO BE WRITTEN
  }

  array_move(arr: any, old_index: number, new_index: number) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  sortDayByPriority() {
    for (var i = 0; i < this.dayResponseToShow.length; i++) {
      if (this.dayResponseToShow[i].priority != '') {
        this.dayResponseToShow = this.array_move(
          this.dayResponseToShow,
          i,
          Number(this.dayResponseToShow[i].priority),
        );
      }
    }
  }

  async reorderItems(event: any) {
    this.dayResponseToShow = this.array_move(
      this.dayResponseToShow,
      event.detail.from,
      event.detail.to,
    );
    for (var i = 0; i < this.dayResponseToShow.length; i++) {
      const job = this.dayResponseToShow[i];
      const priority = i.toString();
      this.jobId = job.id;
      const input: CreateJobInput = {
        address: job.address,
        equipment: job.equipment?.map((item: any) => item.id),
        lng: job.lng,
        lat: job.lat,
        requestDate: job.requestDate,
        notes: job.notes,
        priority: priority,
      };
      this.updateJobGQL
        .mutate(
          {
            input: { ...input, id: this.jobId },
          },
          {
            context: {
              useMultipart: true,
            },
          },
        )
        .subscribe((data) => { });
    }
    event.detail.complete();
  }

  returnAllEquipment(array: any) {
    var equipment = '';
    for (let value of array) {
      equipment = equipment + value.name + ',';
    }
    return equipment;
  }

  createMonthElements() {
    for (let job of this.calendarResponseToShow) {
      const tempElement = document.createElement('jobID' + job.id.toString());
      if (job.status == 'pending' || job.status == 'unAssigned') {
        tempElement.innerHTML = `<div style = "font-size:14px;margin:5px;width:100%;text-align:center;border-radius:4px;background:yellow;padding:5px;cursor:pointer;">
        ${job.equipment[0]?.name}
    </div>`;
        tempElement.onclick = () => this.showAssignedModal(job);
      } else if (job.status == 'assigned') {
        tempElement.innerHTML = `<div style = "font-size:14px;margin:5px;width:100%;text-align:center;border-radius:4px;background:blue;color:white;padding:5px;cursor:pointer;">
        ${job.equipment[0]?.name}
    </div>`;
        tempElement.onclick = () => this.showClockOffModal(job);
      } else if (job.status == 'cancelled') {
        tempElement.innerHTML = `<div style = "font-size:14px;margin:5px;width:100%;text-align:center;border-radius:4px;background:red;color:white;padding:5px;cursor:pointer;">
        ${job.equipment[0]?.name}
    </div>`;
        tempElement.onclick = () => this.showClockOffModal(job);
      } else if (job.status == 'completed') {
        tempElement.innerHTML = `<div style = "font-size:14px;margin:5px;width:100%;text-align:center;border-radius:4px;background:green;color:white;padding:5px;cursor:pointer;">
        ${job.equipment[0]?.name}
    </div>`;
        tempElement.onclick = () => this.showClockOffModal(job);
      }
      document
        .getElementById(job.date.toString() + '-' + job.month.toString())
        ?.appendChild(tempElement);
    }
  }

  createWeekElements() {
    for (let job of this.weekResponseToShow) {
      const tempElement = document.createElement('jobID' + job.id.toString());
      if (job.status == 'pending' || job.status == 'unAssigned') {
        tempElement.innerHTML = `<div style = "font-size:10px;margin:5px;text-align:center;border-radius:4px;background:yellow;padding:5px;cursor:pointer;">
        <span style = 'font-weight:bolder;text-decoration: underline;'>${job.builder.name
          }</span><br>
        <span style = 'font-style: italic;'>${job.address}</span><br>
        ${this.returnAllEquipment(job.equipment)}
    </div>`;
        tempElement.onclick = () => this.showAssignedModal(job);
      } else if (job.status == 'assigned') {
        tempElement.innerHTML = `<div style = "font-size:10px;margin:5px;text-align:center;border-radius:4px;background:blue;color:white;padding:5px;cursor:pointer;">
        <span style = 'font-weight:bolder;text-decoration: underline;'>${job.builder.name
          }</span><br>
        <span style = 'font-style: italic;'>${job.address}</span><br>
        ${this.returnAllEquipment(job.equipment)}
    </div>`;
        tempElement.onclick = () => this.showClockOffModal(job);
      } else if (job.status == 'cancelled') {
        tempElement.innerHTML = `<div style = "font-size:10px;margin:5px;text-align:center;border-radius:4px;background:red;color:white;padding:5px;cursor:pointer;">
        <span style = 'font-weight:bolder;text-decoration: underline;'>${job.builder.name
          }</span><br>
        <span style = 'font-style: italic;'>${job.address}</span><br>
        ${this.returnAllEquipment(job.equipment)}
    </div>`;
        tempElement.onclick = () => this.showClockOffModal(job);
      } else if (job.status == 'completed') {
        tempElement.innerHTML = `<div style = "font-size:10px;margin:5px;text-align:center;border-radius:4px;background:green;color:white;padding:5px;cursor:pointer;">
        <span style = 'font-weight:bolder;text-decoration: underline;'>${job.builder.name
          }</span><br>
        <span style = 'font-style: italic;'>${job.address}</span><br>
        ${this.returnAllEquipment(job.equipment)}
    </div>`;
        tempElement.onclick = () => this.showClockOffModal(job);
      }
      document.getElementById(job.date.toString())?.appendChild(tempElement);
    }
  }

  updateMonth() {
    this.selectedDate = new Date(
      this.selectedDate.getFullYear(),
      this.selectedMonth,
      this.selectedDate.getDate(),
      // this.selectedDate.setMonth(this.selectedMonth),
    );
    this.calendarResponse = [];
    this.createArray(true);
  }

  async pushInWeekArray(day: number, month: number) {
    const data = {
      date: day,
      month: month,
    };
    this.week.push(data);
  }

  async pushInWeekDay(day: number, month: number) {
    const data = {
      date: day,
      month: month,
    };
    this.day.push(data);
  }

  createWeekArray(getjobs: boolean) {
    this.week = [];
    const firstDay = this.firstDayOfWeek(this.selectedDate);
    const lastDay = this.lastDayOfWeek(firstDay);
    var day = firstDay;
    var weekDex = 0;
    for (var i = 0; i < 7; i++) {
      this.pushInWeekArray(day.getDate(), day.getMonth());
      day.setDate(day.getDate() + 1);
    }
    if (getjobs) {
      this.getJobs(this.selectedDate, lastDay, 'week');
    } else {
      setTimeout(() => {
        this.createWeekElements();
      }, 500);
    }
  }
  createDayArray() {
    this.day = [];
    var day = this.selectedDate;
    day = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      this.selectedDate.getDate(),
      0, 0, 0, 0
    )
    var weekDex = 0;
    for (var i = 0; i < 1; i++) {
      this.pushInWeekDay(day.getDate(), day.getMonth());
    }
    this.getJobs(day, day, 'day');
  }

  updateWeek() {
    this.createWeekArray(true);
  }

  updateDay() {
    this.createDayArray();
  }

  nextWeek() {
    this.selectedDate = new Date(
      this.selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000,
    );
    this.updateWeek();
  }

  prevWeek() {
    this.selectedDate = new Date(
      this.selectedDate.getTime() - 7 * 24 * 60 * 60 * 1000,
    );
    this.updateWeek();
  }

  hopToDay(date: number, month: number) {
    this.selectedDate = new Date(
      this.selectedDate.getFullYear(),
      month,
      date,
    );
    this.calendarJobs('day');
  }

  nextDay() {
    this.selectedDate = new Date(
      this.selectedDate.getTime() + 1 * 24 * 60 * 60 * 1000,
    );
    this.updateDay();
  }

  prevDay() {
    this.selectedDate = new Date(
      this.selectedDate.getTime() - 1 * 24 * 60 * 60 * 1000,
    );
    this.updateDay();
  }

  showClockOffModal(job: any) {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const scrollStrategy = this.overlay.scrollStrategies.close();

    this.dialogRef = this.overlay.create(
      new OverlayConfig({
        disposeOnNavigation: true,
        scrollStrategy,
        positionStrategy,
        hasBackdrop: false,
        panelClass: 'bc-dialog',
        backdropClass: 'bc-dialog-backdrop',
      }),
    );
    const portal = new ComponentPortal(
      ClockoffDialogComponent,
      null,
      this.createInjector({ job }),
    );
    const componentRef = this.dialogRef.attach(portal);
    merge(
      this.destroy$,
      componentRef.instance.unassigned.pipe(take(1)),
    ).subscribe((hasUnAssigned) => {
      this.dialogRef.dispose();
      if (hasUnAssigned) {
        switch (this.calendarQueryType) {
          case 'month':
            this.updateMonth();
            break;
          case 'day':
            this.updateDay();
            break;
          case 'week':
            this.updateWeek();
            break;
        }
      }
    });
    componentRef.instance.close.pipe(take(1)).subscribe(() => {

      this.calendarJobs(this.calendarQueryType);
      this.dialogRef.dispose();
    });
  }

  private createInjector(options: ClockOffDialogConfig): PortalInjector {
    const weakMap = new WeakMap<any, any>([[CLOCKOFF_DIALOG_CONFIG, options]]);
    return new PortalInjector(this.injector, weakMap);
  }

  async showAssignedModal(job: any) {
    const actionSheet = await this.actionSheetController.create({
      header: job.address,
      subHeader: job.builder.name,
      cssClass: 'blueText',
      mode: 'ios',
      buttons: [{
        text: 'Assign',
        cssClass: 'blueText',
        handler: () => {

          const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.cardContentRef)
            .withPositions([
              new ConnectionPositionPair(
                { originX: 'center', originY: 'top' },
                { overlayX: 'center', overlayY: 'top' },
              ),
            ]);
          const scrollStrategy = this.overlay.scrollStrategies.close();

          this.dialogRef = this.overlay.create(
            new OverlayConfig({
              disposeOnNavigation: true,
              scrollStrategy,
              positionStrategy,
              hasBackdrop: false,
              panelClass: 'bc-dialog',
              backdropClass: 'bc-dialog-backdrop',
              height: 327,
            }),
          );
          const portal = new ComponentPortal(
            AssignJobDialogComponent,
            null,
            this.createInjectorAssign({
              jobId: job.id,
            }),
          );
          const componentRef = this.dialogRef.attach(portal);
          merge(this.destroy$, componentRef.instance.close.pipe(take(1))).subscribe(
            (hasAssigned) => {
              this.dialogRef.dispose();
              if (hasAssigned) {
                // this.update.next();
                switch (this.calendarQueryType) {
                  case 'month':
                    this.updateMonth();
                    break;
                  case 'day':
                    this.updateDay();
                    break;
                  case 'week':
                    this.updateWeek();
                    break;
                }
              }
            },
          );
        }
      }, {
        text: 'Edit',
        cssClass: 'blueText',
        handler: () => {
          this.showClockOffModal(job);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  private createInjectorAssign(
    options: AssignStaffDialogConifg,
  ): PortalInjector {
    const weakMap = new WeakMap<any, any>([
      [ASSIGN_STAFF_DIALOG_CONFIG, options],
    ]);
    return new PortalInjector(this.injector, weakMap);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
