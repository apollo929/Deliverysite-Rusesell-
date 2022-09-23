import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyJobReportComponent } from './components/daily-job-report/daily-job-report.component';
import { ReportTabsComponent } from './components/report-tabs/report-tabs.component';
import { WorkedHoursReportComponent } from './components/worked-hours-report/worked-hours-report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportTabsComponent,
    children: [
      { path: '', redirectTo: 'worked-hours', pathMatch: 'full' },
      {
        path: 'worked-hours',
        component: WorkedHoursReportComponent,
      },
      {
        path: 'daily-jobs',
        component: DailyJobReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
