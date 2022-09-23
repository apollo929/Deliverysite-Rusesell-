import { ReportRoutingModule } from './reports-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { UiSharedModule } from '@dfobobcat/ui/shared/module';
import { CdkTableModule } from '@angular/cdk/table';
import { OverlayModule } from '@angular/cdk/overlay';
import { TimePipe } from './pipe/time.pipe';
import { UiAdminSharedModule } from '@dfobobcat/ui/feature/admin/shared/module';
import { ReportTabsComponent } from './components/report-tabs/report-tabs.component';
import { WorkedHoursReportComponent } from './components/worked-hours-report/worked-hours-report.component';
import { DailyJobReportComponent } from './components/daily-job-report/daily-job-report.component';
import { SearchService } from '@dfobobcat/ui/admin/shared/service';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    CommonModule,
    IonicModule,
    RouterModule,
    UiSharedModule,
    ReactiveFormsModule,
    CdkTableModule,
    OverlayModule,
    UiAdminSharedModule,
  ],
  declarations: [
    TimePipe,
    ReportTabsComponent,
    WorkedHoursReportComponent,
    DailyJobReportComponent,
  ],
  providers: [SearchService],
})
export class ReportModule {}
