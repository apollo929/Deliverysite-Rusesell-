import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from '@dfobobcat/ui/shared/component';
import { InputComponent } from '@dfobobcat/ui/shared/component';
import { TextAreaComponent } from './components/src/lib/text-area/text-area.component';
import { IonicModule } from '@ionic/angular';
import { SelectComponent } from '@dfobobcat/ui/shared/component';
import { DatepickerComponent } from '@dfobobcat/ui/shared/component';
import { DatepickerButtonComponent } from '@dfobobcat/ui/shared/component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { HeaderComponent } from '@dfobobcat/ui/shared/component';
import { StatusSelectorComponent } from '@dfobobcat/ui/shared/component';
import { RadioComponent } from '@dfobobcat/ui/shared/component';
import { JobCardBuilderComponent } from '@dfobobcat/ui/shared/component';
import { CheckboxComponent } from '@dfobobcat/ui/shared/component';
import { FileUploadComponent } from '@dfobobcat/ui/shared/component';
import { RouterModule } from '@angular/router';
import { StatusSwitcherStaffComponent } from '@dfobobcat/ui/shared/component';
import { JobCardStaffComponent } from '@dfobobcat/ui/shared/component';
import { AddressInputComponent } from '@dfobobcat/ui/shared/component';
import { JobDirectionMapComponent } from '@dfobobcat/ui/shared/component';
import { ProfileDialogComponent } from '@dfobobcat/ui/shared/dialog';
import { ConfirmDialogComponent } from '@dfobobcat/ui/shared/dialog';

import { OverlayModule } from '@angular/cdk/overlay';
import { BCDatePipe } from '@dfobobcat/ui/shared/pipe';
import { DatepickerDropdownComponent } from './components/src/lib/datepicker-dropdown/datepicker-dropdown.component';
import { CapitalizeFirstLetterPipe } from '@dfobobcat/ui/shared/pipe';
@NgModule({
  declarations: [
    FormErrorComponent,
    InputComponent,
    TextAreaComponent,
    SelectComponent,
    DatepickerComponent,
    DatepickerButtonComponent,
    HeaderComponent,
    StatusSelectorComponent,
    RadioComponent,
    JobCardBuilderComponent,
    JobCardStaffComponent,
    CheckboxComponent,
    StatusSwitcherStaffComponent,
    FileUploadComponent,
    JobCardStaffComponent,
    AddressInputComponent,
    JobDirectionMapComponent,
    ProfileDialogComponent,
    ConfirmDialogComponent,
    BCDatePipe,
    DatepickerDropdownComponent,
    CapitalizeFirstLetterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DpDatePickerModule,
    RouterModule,
    OverlayModule,
  ],
  exports: [
    FormErrorComponent,
    InputComponent,
    SelectComponent,
    DatepickerComponent,
    DatepickerButtonComponent,
    HeaderComponent,
    StatusSelectorComponent,
    RadioComponent,
    JobCardBuilderComponent,
    CheckboxComponent,
    FileUploadComponent,
    StatusSwitcherStaffComponent,
    AddressInputComponent,
    JobCardStaffComponent,
    JobDirectionMapComponent,
    BCDatePipe,
    DatepickerDropdownComponent,
    CapitalizeFirstLetterPipe,
  ],
})
export class UiSharedModule {}
