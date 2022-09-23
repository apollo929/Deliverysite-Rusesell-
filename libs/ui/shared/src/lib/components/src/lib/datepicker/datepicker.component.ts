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
import { FormControl } from '@angular/forms';
import { AnimationController } from '@ionic/angular';
import * as moment from 'moment';
import { DatePickerComponent, IDatePickerConfig } from 'ng2-date-picker';

@Component({
  selector: 'bc-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  @Input()
  control!: FormControl;

  @Input()
  min: moment.Moment = moment();

  datePickerConfig!: IDatePickerConfig;
  selectedDate = moment();
  currentMonth = moment();
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
    this.datePicker.api.open();
    setTimeout(() => {
      const dpElement = this.datePickerWrap.nativeElement;
      this.renderer.setStyle(dpElement, 'display', 'block');
      const margin = 34;
      const containerPaddingBottom = 0;
      const datepickerHeight = dpElement.offsetHeight;
      const inputTopDistance = this.dateInput.nativeElement.getBoundingClientRect()
        .top;

      const maxViewportHeight = 880;
      const viewportHeight =
        window.innerHeight > maxViewportHeight
          ? maxViewportHeight
          : window.innerHeight;

      const moveDatepickerOn = viewportHeight - inputTopDistance;

      this.renderer.setStyle(
        dpElement,
        'bottom',
        `-${datepickerHeight + containerPaddingBottom}px`,
      );

      this.animationCtrl
        .create()
        .addElement(dpElement)
        .duration(100)
        .to('transform', `translateY(-${moveDatepickerOn - margin}px)`)
        .play();
    });
  }

  async closeDatepicker() {
    const dpElement = this.datePickerWrap.nativeElement;

    await this.animationCtrl
      .create()
      .addElement(dpElement)
      .duration(100)
      .to('transform', `translateY(0)`)
      .play();

    this.renderer.setStyle(dpElement, 'display', 'none');
    this.datePicker.api.close();
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
}
