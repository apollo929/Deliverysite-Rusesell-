import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { JobStatus, MyJobRequestsGQL } from '@dfobobcat/graphql-types';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import * as moment from 'moment';

@Component({
  selector: 'bc-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsPage implements ViewWillEnter, ViewWillLeave {
  selectedStatus: JobStatus = JobStatus.Pending;
  searchForm: FormGroup;
  searchSubmit$ = new Subject();
  perfectScrollbarConfig = {};
  jobStatus = JobStatus;
  jobs$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  statusChanges$ = new BehaviorSubject<JobStatus>(JobStatus.Pending);
  destroy$ = new Subject();

  constructor(
    private myJobRequestsGQL: MyJobRequestsGQL,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      searchCtrl: [''],
    });
  }

  get searchCtrl(): FormControl {
    return this.searchForm.get('searchCtrl') as FormControl;
  }

  ionViewWillEnter() {
    this.getJobs().subscribe((result) => {
      this.jobs$.next(result);
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
      .subscribe();
  }

  jobCancelled(idx: number) {
    this.jobs$.pipe(take(1)).subscribe((jobs) => {
      jobs.splice(idx, 1);
      this.jobs$.next(jobs);
    });
  }

  getJobs() {
    return this.myJobRequestsGQL
      .fetch({
        search: this.searchCtrl.value,
        status: this.selectedStatus,
      })
      .pipe(
        map((result) =>
          'jobRequests' in result.data.me ? result.data.me['jobRequests'] : [],
        ),
      );
  }

  ionViewWillLeave() {
    this.destroy$.next();
  }

  updateJobs() {
    this.getJobs().subscribe((result) => {
      this.jobs$.next(result);
    });
  }
}
