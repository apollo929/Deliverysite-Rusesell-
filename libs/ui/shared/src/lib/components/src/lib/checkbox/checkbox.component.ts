import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectorRef,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'bc-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CheckboxComponent),
    },
  ],
})
export class CheckboxComponent implements OnInit, OnDestroy {
  control: FormControl = new FormControl('');
  @Input() label = '';
  @Input() value = '';
  @Input()
  padding = '15px 15px';

  @Input()
  @HostBinding('class')
  theme = 'dark';

  destroy$ = new Subject();
  _controlValue = false;

  @Output() selected = new EventEmitter();

  get controlValue() {
    return this._controlValue;
  }

  setValue(event: any): void {
    if (event.target.nodeName !== 'INPUT') {
      return;
    }
    this._controlValue = !this.controlValue;
    this.propagateChange(this._controlValue);
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.control.setValue(this.value);
  }

  writeValue(value: any) {
    this._controlValue = value;
    this.propagateChange(this._controlValue);
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  ngOnDestroy() {
    this.destroy$.next();
  }
}
