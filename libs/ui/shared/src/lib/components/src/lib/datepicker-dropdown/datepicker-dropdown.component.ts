import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AnimationController } from '@ionic/angular';
import * as moment from 'moment';
import { DatePickerComponent, IDatePickerConfig } from 'ng2-date-picker';

@Component({
  selector: 'bc-datepicker-dropdown',
  templateUrl: './datepicker-dropdown.component.html',
  styleUrls: ['./datepicker-dropdown.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(document:click)': 'onOutsideClick($event)',
  },
})
export class DatepickerDropdownComponent {
  @Input()
  control!: FormControl;

  @Input()
  label = 'Pick a date';

  datePickerConfig: IDatePickerConfig = {
    firstDayOfWeek: 'mo',
    opens: 'left',
    format: 'MMM D, dddd',
    hideOnOutsideClick: false,
    closeOnSelect: false,
  };
  selectedDate = moment();
  currentMonth = moment();
  datePickerOpened = false;
  @Input() placeholder!: string;
  @Output() selected = new EventEmitter();
  @ViewChild('datepickerWrapper', { read: ElementRef })
  datePickerWrap!: ElementRef;
  @ViewChild('dateInput', { read: ElementRef })
  dateInput!: ElementRef;
  @ViewChild(DatePickerComponent) datePicker!: DatePickerComponent;
  constructor(
    private animationCtrl: AnimationController,
    private renderer: Renderer2,
    private elRef: ElementRef,
  ) {}

  moveDatePickerToPrev() {
    this.datePicker.api.moveCalendarTo(
      (this.currentMonth = moment(this.currentMonth).subtract(1, 'month')),
    );
  }

  moveDatePickerToNext() {
    // this.datePicker.api.moveCalendarTo();
    this.datePicker.api.moveCalendarTo(
      (this.currentMonth = moment(this.currentMonth).add(1, 'month')),
    );
  }

  async openDatepicker() {
    if (this.datePickerOpened) {
      return;
    }
    this.datePicker.api.open();
    setTimeout(() => {
      const dpElement = this.datePickerWrap.nativeElement;
      this.renderer.setStyle(dpElement, 'display', 'block');
      this.datePickerOpened = true;
    });
  }

  async closeDatepicker() {
    if (!this.datePickerOpened) {
      return;
    }
    const dpElement = this.datePickerWrap.nativeElement;

    this.renderer.setStyle(dpElement, 'display', 'none');
    this.datePicker.api.close();
    this.datePickerOpened = false;
  }

  async dateSelected(selected: any) {
    this.control.setValue(selected.date.format('MMM D, dddd'));
    const date = selected.date.toDate();
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const localISOTime = new Date(date - tzoffset).toISOString();
    this.selected.emit(localISOTime);
    await this.closeDatepicker();
  }

  get currentMonthTitle() {
    return this.currentMonth.format('MMMM');
  }

  onOutsideClick($event: MouseEvent) {
    if (!this.elRef.nativeElement.contains($event.target)) {
      this.closeDatepicker();
    }
  }
}
