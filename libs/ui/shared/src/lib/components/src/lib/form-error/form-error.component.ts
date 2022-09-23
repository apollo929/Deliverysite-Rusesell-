import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'bc-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent implements OnInit {
  @Input() control!: FormControl | AbstractControl;
  @Input() name = '';
  constructor(private cd: ChangeDetectorRef) {}
  ngOnInit() {
    // this.control.statusChanges.subscribe(() => this.cd.markForCheck());
  }
  get hasError() {
    return this.control && this.control.dirty && this.control.errors;
  }
  get errorMessage() {
    if (!this.control.errors) {
      return '';
    }
    const ERROR_MESSAGE_MAP: Record<string, string> = {
      minlength: ' should be more than 8 characters',
      required: 'is required.',
      email: 'is invalid.',
    };
    const errCode: string = Object.keys(this.control.errors)[0];
    return `${this.name} ${ERROR_MESSAGE_MAP[errCode]}`;
  }
}
