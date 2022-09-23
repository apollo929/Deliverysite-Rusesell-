import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { ORDER_DIRECTION } from '@dfobobcat/ui/shared/model';

import {
  concatMap,
  distinctUntilChanged,
  map,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  TotalWorkedHoursGQL,
  TotalWorkedHoursQuery,
} from '@dfobobcat/graphql-types';
import { getISOStringWithoutTZ } from '@dfobobcat/ui/shared/tool';
import * as moment from 'moment';
import { SearchService } from '@dfobobcat/ui/admin/shared/service';
@Component({
  selector: 'dfobobcat-report',
  templateUrl: './worked-hours-report.component.html',
  styleUrls: ['./worked-hours-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkedHoursReportComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  dateRangeForm!: FormGroup;
  searchSubmit$ = new Subject();
  dataSource$ = new BehaviorSubject<
    TotalWorkedHoursQuery['report']['totalWorkedHours']['items']
  >([]);
  displayedColumns = ['photo', 'name', 'email', 'hours'];
  destroy$ = new Subject();
  now = new Date();
  startRange$ = new BehaviorSubject<string>(
    getISOStringWithoutTZ(
      new Date(this.now.getFullYear(), this.now.getMonth(), 1).getTime(),
    ),
  );
  endRange$ = new BehaviorSubject<string>(
    getISOStringWithoutTZ(
      new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0).getTime(),
    ),
  );

  ORDER_DIRECTION = ORDER_DIRECTION;
  orderKeys = {
    '"totalWorkedHours"': 'Time worked',
    'user.name': 'Name',
  };
  orderBy$ = new BehaviorSubject<string>('"totalWorkedHours"');
  orderDirection$ = new BehaviorSubject<ORDER_DIRECTION>(ORDER_DIRECTION.DESC);
  hasNextPage$ = new BehaviorSubject<boolean>(false);
  hasPreviousPage$ = new BehaviorSubject<boolean>(false);
  previousPage: number | undefined;
  nextPage: number | undefined;
  paginate$ = new BehaviorSubject<number | undefined>(0);

  search$ = this.searchSerice.search$;

  get startDateCtrl() {
    return this.dateRangeForm.get('startDate') as FormControl;
  }
  get endDateCtrl() {
    return this.dateRangeForm.get('endDate') as FormControl;
  }
  constructor(
    private fb: FormBuilder,
    private totalWorkedHoursGQL: TotalWorkedHoursGQL,
    private searchSerice: SearchService,
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchCtrl: [''],
    });
    combineLatest([this.startRange$, this.endRange$])
      .pipe(take(1))
      .subscribe(([start, end]) => {
        this.dateRangeForm = this.fb.group({
          startDate: [moment(start).utc().format('MMM D, dddd')],
          endDate: [moment(end).utc().format('MMM D, dddd')],
        });
      });

    combineLatest([
      this.startRange$,
      this.endRange$,
      this.orderBy$,
      this.orderDirection$,
      this.paginate$,
      this.search$.pipe(distinctUntilChanged()),
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([start, end]) => {
          this.dateRangeForm = this.fb.group({
            startDate: [moment(start).utc().format('MMM D, dddd')],
            endDate: [moment(end).utc().format('MMM D, dddd')],
          });
        }),
        tap(() => {
          this.getReport();
        }),
      )
      .subscribe();
  }

  getReport() {
    combineLatest([
      this.startRange$,
      this.endRange$,
      this.orderBy$,
      this.orderDirection$,
      this.paginate$,
      this.search$.pipe(distinctUntilChanged()),
    ])
      .pipe(
        take(1),
        concatMap(
          ([startRange, endRange, orderBy, orderDirection, page, search]) => {
            return this.totalWorkedHoursGQL.fetch({
              startDate: startRange,
              endDate: endRange,
              orderBy: `${orderDirection}${orderBy}`,
              pagination: {
                page,
              },
              search,
            });
          },
        ),
        map((result) => result.data.report.totalWorkedHours),
        tap((result) => {
          this.hasNextPage$.next(result.pageInfo.hasNextPage);
          this.hasPreviousPage$.next(result.pageInfo.hasPreviousPage);
          this.previousPage = result.pageInfo.previousPage;
          this.nextPage = result.pageInfo.nextPage;
        }),
        map((result) => result.items),
        tap((result) => this.dataSource$.next(result)),
      )
      .subscribe();
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
      });
  }

  get searchCtrl(): FormControl {
    return this.searchForm.get('searchCtrl') as FormControl;
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
