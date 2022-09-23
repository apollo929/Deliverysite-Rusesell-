import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  Input,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { JobsGQL, JobsQuery, JobStatus } from '@dfobobcat/graphql-types';
import {
  concatMap,
  distinctUntilChanged,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { ORDER_DIRECTION } from '@dfobobcat/ui/shared/model';

@Component({
  selector: 'bc-job-assigned-list',
  templateUrl: './job-assigned-list.component.html',
  styleUrls: ['./job-assigned-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobAssignedListComponent implements OnInit, OnDestroy {
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

  @Input()
  update!: Subject<undefined>;

  @Input()
  staffFilter$!: BehaviorSubject<undefined | number[]>;

  @Input()
  search$!: BehaviorSubject<string>;

  @Input() calendarType!: BehaviorSubject<string>;

  constructor(private jobsGQL: JobsGQL, private cdRef: ChangeDetectorRef) {}

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
      this.search$.pipe(distinctUntilChanged()),
      this.staffFilter$,
      this.update,
      this.calendarType,
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
      this.staffFilter$,
      this.calendarType,
    ).pipe(
      take(1),
      concatMap(([order, direction, page, search, staff]) => {
        return this.jobsGQL.fetch({
          status: [
            JobStatus.Completed,
            JobStatus.InProgress,
            JobStatus.Cancelled,
            JobStatus.Assigned,
          ],
          orderBy: `${direction}${order}`,
          search: search,
          pagination: {
            page,
          },
          staff: staff,
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
