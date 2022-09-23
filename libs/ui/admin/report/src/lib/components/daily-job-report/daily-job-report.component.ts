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
  JobsForDateGQL,
  JobsForDateQuery,
  JobsForDateFullListGQL,
} from '@dfobobcat/graphql-types';
import { getISOStringWithoutTZ } from '@dfobobcat/ui/shared/tool';
import * as moment from 'moment';
import { SearchService } from '@dfobobcat/ui/admin/shared/service';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'bc-daily-job-report',
  templateUrl: './daily-job-report.component.html',
  styleUrls: ['./daily-job-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyJobReportComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  dateForm!: FormGroup;
  searchSubmit$ = new Subject();
  dataSource$ = new BehaviorSubject<
    JobsForDateQuery['report']['jobsForDate']['items']
  >([]);
  displayedColumns = [
    'id',
    'staff',
    'builder',
    'address',
    'equipment',
    'notes',
    'cost',
    'inv',
  ];
  destroy$ = new Subject();
  now = new Date();
  selectedDay$ = new BehaviorSubject<string>(
    getISOStringWithoutTZ(new Date().getTime()),
  );

  ORDER_DIRECTION = ORDER_DIRECTION;
  orderKeys = {
    'job.address': 'Address',
    'builder.name': 'Builder name',
  };
  orderBy$ = new BehaviorSubject<string>('builder.name');
  orderDirection$ = new BehaviorSubject<ORDER_DIRECTION>(ORDER_DIRECTION.DESC);
  hasNextPage$ = new BehaviorSubject<boolean>(false);
  hasPreviousPage$ = new BehaviorSubject<boolean>(false);
  previousPage: number | undefined;
  nextPage: number | undefined;
  paginate$ = new BehaviorSubject<number | undefined>(0);

  search$ = this.searchSerice.search$;
  jobs: any[] = [];
  extraData:any[] = [];
  notes: string = "";
  priority: string = "";
  cost: string = "";

  get selectedDayCtrl() {
    return this.dateForm.get('selectedDay') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private jobsForDateGQL: JobsForDateGQL,
    private jobsForDateFullListGQL: JobsForDateFullListGQL,
    private searchSerice: SearchService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchCtrl: [''],
    });
    combineLatest([this.selectedDay$])
      .pipe(take(1))
      .subscribe(([selectedDay]) => {
        this.dateForm = this.fb.group({
          selectedDate: [moment(selectedDay).utc().format('MMM D, dddd')],
        });
      });

    combineLatest([
      this.selectedDay$,
      this.orderBy$,
      this.orderDirection$,
      this.paginate$,
      this.search$.pipe(distinctUntilChanged()),
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([selectedDay]) => {
          this.dateForm = this.fb.group({
            selectedDay: [moment(selectedDay).utc().format('MMM D, dddd')],
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
      this.selectedDay$,
      this.orderBy$,
      this.orderDirection$,
      this.paginate$,
      this.search$.pipe(distinctUntilChanged()),
    ])
      .pipe(
        take(1),
        concatMap(([selectedDate, orderBy, orderDirection, page, search]) => {
          return this.jobsForDateGQL.fetch({
            date: selectedDate,
            orderBy: `${orderDirection}${orderBy}`,
            pagination: {
              page,
            },
            search,
          });
        }),
        map((result) => result.data.report.jobsForDate),
        tap((result) => {
          this.hasNextPage$.next(result.pageInfo.hasNextPage);
          this.hasPreviousPage$.next(result.pageInfo.hasPreviousPage);
          this.previousPage = result.pageInfo.previousPage;
          this.nextPage = result.pageInfo.nextPage;
        }),
        map((result) => result.items),
        tap((result) => this.dataSource$.next(result)),
      )
      .subscribe(data => {
        this.jobs = data;
        console.log(this.jobs);
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
      });
  }

  get searchCtrl(): FormControl {
    return this.searchForm.get('searchCtrl') as FormControl;
  }

  getStaff(items: Record<any, any>[]) {
    return Array.isArray(items) && items.length
      ? items.map((item) => item?.name).join(', ')
      : '';
  }

  getEquipment(items: Record<any, any>[]) {
    return Array.isArray(items) && items.length
      ? items.map((item) => item?.name).join(', ')
      : '';
  }

  generateSpreadSheet() {
    let selectedDateOutside = '';

    combineLatest([
      this.selectedDay$,
      this.orderBy$,
      this.orderDirection$,
      this.search$.pipe(distinctUntilChanged()),
    ])
      .pipe(
        take(1),
        tap(([selectedDate]) => (selectedDateOutside = selectedDate)),
        concatMap(([selectedDate, orderBy, orderDirection, search]) => {
          return this.jobsForDateFullListGQL.fetch({
            date: selectedDate,
            orderBy: `${orderDirection}${orderBy}`,
            search,
          });
        }),
        map((result) => result.data.report.jobsForDateFullList),
        tap((items) => {
          let title = 'daily_report.csv';
          const match = selectedDateOutside.match(/^(\d{4})-(\d{2})-(\d{2})/);
          if (match && match[1] && match[2] && match[3]) {
            title = `jobs_daily_${match[3]}-${match[2]}-${match[1]}.csv`;
          }
          const spreadSheetConfig = {
            filename: title,
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: false,
            useTextFile: false,
            useBom: true,
            headers: [
              'ID',
              'Trade Name',
              'Builder Name',
              'Site Address',
              'Stage',
              'Notes',
              'Cost',
            ],
          };
          const csvExporter = new ExportToCsv(spreadSheetConfig);
          csvExporter.generateCsv(items);
        }),
      )
      .subscribe();
  }

  findIndex(ID:string){
    return this.jobs.findIndex(x => x.id ===ID);
  }

  updateNotes(event: any, type:string, ID:string) {
    if(type == 'jobs'){
      this.jobs[this.jobs.findIndex(x => x.id ===ID)].notes = event?.target.value;
    } else if (type == 'extra'){
      this.extraData[Number(ID)].notes = event?.target.value;
    }
  }
  
  updateInovice(event: any, type:string, ID:string) {
    if(type == 'jobs'){
      this.jobs[this.jobs.findIndex(x => x.id ===ID)].inovice = event?.target.value;
    } else if (type == 'extra'){
      this.extraData[Number(ID)].inovice = event?.target.value;
    }
  }

  updateStages(event: any, type:string, ID:string) {
    if(type === 'jobs'){
      this.jobs[this.jobs.findIndex(x => x.id ===ID)].cost = event?.target.value;
    } else if (type === 'extra'){
      this.extraData[Number(ID)].stages = event?.target.value;
    }
  }

  updateCost(event: any, type:string, ID:string) {
    if(type === 'jobs'){
      this.jobs[this.jobs.findIndex(x => x.id ===ID)].cost = event?.target.value;
    } else if (type === 'extra'){
      this.extraData[Number(ID)].cost = event?.target.value;
    }
  }

  duplicateRow(ID:string){
    let data = this.jobs[this.findIndex(ID)];
    this.extraData.push(Object.assign({}, data));
    this.getAllStages(this.extraData.length-1);
  }

  getAllStages(index:number){
    this.extraData[index].stages = "";
    for (let stage of this.extraData[index].equipment){
      this.extraData[index].stages += stage.name + ", ";
    }
  }


  printReport() {
    console.log(this.jobs, this.extraData);
    var printWindow = window.open('', 'PRINT', 'height=720,width=1280');
    printWindow?.document.write('<html><head><title>' + "DFOBOBCAT - Report for the day" + '</title>');
    printWindow?.document.write('</head><body >');
    printWindow?.document.write('<h1>' + "Report for the day" + '</h1>');
    printWindow?.document.write("<table style = 'width:100%;border: 2px solid black;'>");

    printWindow?.document.write("<tr style = 'border:2px solid black;'>");

    printWindow?.document.write("<td style = 'font-weight:bold; border:2px solid black;'>ID</td>");
    printWindow?.document.write("<td style = 'font-weight:bold; border:2px solid black;'>Trade Name</td>");
    printWindow?.document.write("<td style = 'font-weight:bold; border:2px solid black;'>Builder Name</td>");
    printWindow?.document.write("<td style = 'font-weight:bold; border:2px solid black;'>Address</td>");
    printWindow?.document.write("<td style = 'font-weight:bold; border:2px solid black;'>Stage</td>");
    printWindow?.document.write("<td style = 'font-weight:bold; border:2px solid black;'>Notes</td>");
    printWindow?.document.write("<td style = 'font-weight:bold; border:2px solid black;'>Cost</td>");
    printWindow?.document.write("<td style = 'font-weight:bold; border:2px solid black;'>Inovice</td>");

    printWindow?.document.write("</tr>");

    for (let job of this.jobs) {
      printWindow?.document.write("<tr style = 'border-bottom:1px solid black;'>");
      printWindow?.document.write("<td>" + job.id + "</td>");
      printWindow?.document.write("<td>");
      for (let staff of job.staff)
        printWindow?.document.write(staff.name + ", ");
      printWindow?.document.write("</td>");

      printWindow?.document.write("<td>" + job.builder.name + "</td>");
      printWindow?.document.write("<td>" + job.address + "</td>");
      printWindow?.document.write("<td>");

      for (let stage of job.equipment)
        printWindow?.document.write(stage.name + ", ");
      printWindow?.document.write("</td>");

      printWindow?.document.write("<td>" + job.notes + "</td>");
      printWindow?.document.write("<td>" + job.cost + "</td>");
      printWindow?.document.write("<td>" + job.inovice + "</td>");
      printWindow?.document.write("</tr>");
    }
    
    for (let job of this.extraData) {
      printWindow?.document.write("<tr style = 'border-bottom:1px solid black;'>");
      printWindow?.document.write("<td>" + job.id + "</td>");
      printWindow?.document.write("<td>");
      for (let staff of job.staff)
        printWindow?.document.write(staff.name + ", ");
      printWindow?.document.write("</td>");

      printWindow?.document.write("<td>" + job.builder.name + "</td>");
      printWindow?.document.write("<td>" + job.address + "</td>");
      printWindow?.document.write("<td>");
      printWindow?.document.write(job.stages);
      printWindow?.document.write("</td>");

      printWindow?.document.write("<td>" + job.notes + "</td>");
      printWindow?.document.write("<td>" + job.cost + "</td>");
      printWindow?.document.write("<td>" + job.inovice + "</td>");
      printWindow?.document.write("</tr>");
    }

    printWindow?.document.write('</body></html>');

    printWindow?.document.close();
    printWindow?.focus();

    printWindow?.print();
    printWindow?.close();

    return true;
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
