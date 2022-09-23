import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import {
  BehaviorSubject,
  combineLatest,
  from,
  merge,
  Observable,
  of,
  Subject,
} from 'rxjs';
import {
  concatMap,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  JobFilter,
  AddClockInGQL,
  MyAssignedJobsGQL,
  TodaysAssignedJobGQL,
  HasClockedIntoJobGQL,
} from '@dfobobcat/graphql-types';
import { Router } from '@angular/router';
import { AlertService, ConfigService } from '@dfobobcat/ui/shared/service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

interface todaysJob {
  id: number;
  equipment: string;
  address: string;
}
@Component({
  selector: 'bc-staff-jobs',
  templateUrl: './staff-jobs.page.html',
  styleUrls: ['./staff-jobs.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffJobsPage implements ViewWillEnter, ViewWillLeave {
  searchForm: FormGroup;
  searchSubmit$ = new Subject();

  todaysJob$ = new BehaviorSubject<any>(undefined);
  selectedStatus: JobFilter = JobFilter.Upcoming;

  statusChanges$ = new BehaviorSubject<JobFilter>(JobFilter.Upcoming);
  JobFilter = JobFilter;
  jobs$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  destroy$ = new Subject();

  constructor(
    private myAssignedJobsGQL: MyAssignedJobsGQL,
    private todaysAssignedJobGQL: TodaysAssignedJobGQL,
    private router: Router,
    private fb: FormBuilder,
    private addClockInGQL: AddClockInGQL,
    private alertService: AlertService,
    private geolocation: Geolocation,
    private configService: ConfigService,
    private hasClockedIntoJobIdGQL: HasClockedIntoJobGQL,
  ) {
    this.searchForm = this.fb.group({
      searchCtrl: [''],
    });
  }

  ionViewWillEnter() {
    const jobs$ = this.getJobs();
    const todaysJob$ = this.getTodaysJob();
    combineLatest([jobs$, todaysJob$])
      .pipe(take(1))
      .subscribe(([jobs, todaysJob]) => {
        this.jobs$.next(jobs);
        if (todaysJob) {
          const equipment = todaysJob.equipment
            .map((item: any) => item.name)
            .join(', ');
          this.todaysJob$.next({ ...todaysJob, equipment });
        } else {
          this.todaysJob$.next(undefined);
        }
      });

    merge(
      this.searchSubmit$,
      this.statusChanges$.pipe(tap((status) => (this.selectedStatus = status))),
    )
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.getJobs()),
        tap((result) => {
          this.jobs$.next(result);
        }),
      )
      .subscribe(() => {
        this.sortDayByPriority(this.jobs$.value);
      });
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

  sortDayByPriority(jobs: any) {
    for (var i = 0; i < jobs.length; i++) {
      if (jobs[i].priority != '') {
        jobs = this.array_move(jobs, i, Number(jobs[i].priority));
      }
    }
    console.log(jobs);
  }

  clockOff(id: number) {
    this.router.navigate(['/staff', 'clock-off', id]);
  }

  get searchCtrl(): FormControl {
    return this.searchForm.get('searchCtrl') as FormControl;
  }

  jobCancelled(idx: number) {
    this.jobs$.pipe(take(1)).subscribe((jobs) => {
      jobs.splice(idx, 1);
      this.jobs$.next(jobs);
    });
  }

  clockIn(jobId: number) {
    this.router.navigate(['/staff', 'clock-in', jobId]);

    return;
  }

  getJobs() {
    return this.myAssignedJobsGQL
      .fetch({
        search: this.searchCtrl.value,
        filter: this.selectedStatus,
      })
      .pipe(map((result) => (result.data.me as any)['assignedJobs']));
  }

  getTodaysJob() {
    return this.todaysAssignedJobGQL
      .fetch()
      .pipe(map((result) => (result.data.me as any).todaysAssignedJob));
  }

  ionViewWillLeave() {
    this.destroy$.next();
  }
}
