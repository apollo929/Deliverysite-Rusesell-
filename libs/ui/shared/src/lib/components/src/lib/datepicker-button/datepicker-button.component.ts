import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';
import { AnimationController } from '@ionic/angular';
import * as moment from 'moment';
import { DatePickerComponent, IDatePickerConfig } from 'ng2-date-picker';

@Component({
  selector: 'bc-datepicker-button',
  templateUrl: './datepicker-button.component.html',
  styleUrls: ['./datepicker-button.component.scss'],
})
export class DatepickerButtonComponent implements OnInit {
  @Input()
  min: moment.Moment = moment();

  datePickerConfig!: IDatePickerConfig;
  selectedDate = '';
  currentMonth = moment();
  @Input() showDatePicker!: boolean;
  @Input() jobData!: any;

  @Output() selected = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() canceled = new EventEmitter();

  @ViewChild('datepickerWrapper', { read: ElementRef })
  datePickerWrap!: ElementRef;
  @ViewChild('dateInput', { read: ElementRef })
  dateInput!: ElementRef;
  @ViewChild(DatePickerComponent) datePicker!: DatePickerComponent;
  constructor(
    private animationCtrl: AnimationController,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.datePickerConfig = {
      firstDayOfWeek: 'mo',
      opens: 'left',
      format: 'MMM D, dddd',
      hideOnOutsideClick: false,
      closeOnSelect: false,
      min: this.min,
    };
  }
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
    const dpElement = this.datePickerWrap.nativeElement;
    this.datePicker.api.open();
    setTimeout(() => {
      this.renderer.setStyle(dpElement, 'display', 'block');
    });
  }
  async openEditDatePickerDialog() {
    const dpElement = this.datePickerWrap.nativeElement;
    this.datePicker.api.open();
    setTimeout(() => {
      this.renderer.setStyle(dpElement, 'display', 'block');
      this.renderer.setStyle(dpElement, 'width', '100%');
      this.renderer.setStyle(dpElement, 'left', '0');
    });
  }
  async closeDatepicker() {
    const dpElement = this.datePickerWrap.nativeElement;
    this.renderer.setStyle(dpElement, 'display', 'none');
    this.datePicker.api.close();
  }

  async dateSelected(selected: any) {
    // this.control.setValue(selected.date.format('MMM D, dddd'));
    const date = selected.date.toDate();
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    this.selectedDate = new Date(date - tzoffset).toISOString();
  }

  get currentMonthTitle() {
    return this.currentMonth.format('MMMM');
  }

  save() {
    this.closeDatepicker();
    this.updated.emit(this.selectedDate);
  }
  cancel() {
    this.closeDatepicker();
    this.canceled.emit();
  }
}
