import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from '@dfobobcat/ui/admin/shared/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DpDatePickerModule } from 'ng2-date-picker';
import { RouterModule } from '@angular/router';
import { UiSharedModule } from '@dfobobcat/ui/shared/module';
import { SearchService } from './service/src';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DpDatePickerModule,
    RouterModule,
    UiSharedModule,
  ],
  declarations: [AdminHeaderComponent],
  exports: [AdminHeaderComponent],
  providers: [SearchService],
})
export class UiAdminSharedModule {}
