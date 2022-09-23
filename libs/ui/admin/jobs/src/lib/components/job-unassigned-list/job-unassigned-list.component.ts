import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { JobsGQL, JobsQuery, JobStatus } from '@dfobobcat/graphql-types';
import {
  concatMap,
  distinctUntilChanged,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

enum ORDER_DIRECTION {
  DESC = '-',
  ASC = '+',
}

@Component({
  selector: 'bc-job-unassigned-list',
  templateUrl: './job-unassigned-list.component.html',
  styleUrls: ['./job-unassigned-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobUnassignedListComponent implements OnInit, OnDestroy {
  jobs$ = new BehaviorSubject<JobsQuery['jobs']['items']>([]);
  ORDER_DIRECTION = ORDER_DIRECTION;

  orderKeys = {
    'job.requestDate': 'Date',
    'job.address': 'Address',
  };

  orderBy$ = new BehaviorSubject<string>('job.requestDate');
  orderDirection$ = new BehaviorSubject<ORDER_DIRECTION>(ORDER_DIRECTION.DESC);
  hasNextPage$ = new BehaviorSubject<boolean>(false);
  hasPreviousPage$ = new BehaviorSubject<boolean>(false);
  previousPage: number | undefined;
  nextPage: number | undefined;
  paginate$ = new BehaviorSubject<number | undefined>(0);
  destroy$ = new Subject();
  calendarFilter = '';
  // @Output()
  // update = new BehaviorSubject(undefined);
  @Input()
  update!: Subject<undefined>;
  @Input()
  search$!: BehaviorSubject<string>;

  @Input() calendarType!: BehaviorSubject<string>;
  @Input()
  staffFilter$!: BehaviorSubject<undefined | number[]>;

  constructor(
    private fb: FormBuilder,
    private jobsGQL: JobsGQL,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.calendarType.subscribe((value) => {
      this.calendarFilter = value;
    });
    if (!this.search$) {
      this.search$ = new BehaviorSubject('');
    }
    combineLatest(
      this.orderBy$,
      this.orderDirection$,
      this.paginate$,
      this.search$,
      this.update,
      this.calendarType,
      this.staffFilter$,
    )
      .pipe(
        takeUntil(this.destroy$),

        switchMap(() => {
          return this.getJobs();
        }),
      )

      .subscribe((result) => {
        this.jobs$.next(result.data.jobs.items);
        this.cdRef.markForCheck();
      });
  }
  /**
   * if order is the same, change ordeer direction
   * otherwise, change order
   */
  changeSorting(newOrder: string) {
    combineLatest(this.orderBy$, this.orderDirection$)
      .pipe(take(1))
      .subscribe(([order, direction]) => {
        if (order === newOrder) {
          this.orderDirection$.next(
            direction === ORDER_DIRECTION.ASC
              ? ORDER_DIRECTION.DESC
              : ORDER_DIRECTION.ASC,
          );
        } else {
          this.orderBy$.next(newOrder);
        }
        this.cdRef.markForCheck();
      });
  }

  updateJobs() {
    this.getJobs().subscribe((result) => {
      this.jobs$.next(result.data.jobs.items);
      this.cdRef.markForCheck();
    });
    this.update.next(undefined);
  }

  getJobs() {
    return combineLatest(
      this.orderBy$,
      this.orderDirection$,
      this.paginate$,
      this.search$.pipe(distinctUntilChanged()),
      this.calendarType,
      this.staffFilter$,
    ).pipe(
      take(1),
      concatMap(([order, direction, page, search, calendarType, staff]) => {
        return this.jobsGQL.fetch({
          status: [JobStatus.Pending, JobStatus.UnAssigned],
          //filteredDate: this.calendarFilter || '',
          search,
          orderBy: `${direction}${order}`,
          pagination: {
            page,
          },
          staff,
        });
      }),
      tap((result: { data: JobsQuery }) => {
        this.hasNextPage$.next(result.data.jobs.pageInfo.hasNextPage);
        this.hasPreviousPage$.next(result.data.jobs.pageInfo.hasPreviousPage);
        this.nextPage = result.data.jobs.pageInfo.nextPage;
        this.previousPage = result.data.jobs.pageInfo.previousPage;
      }),
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
