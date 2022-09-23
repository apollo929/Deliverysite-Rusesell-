import {
    AfterViewInit,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    ViewChild,
  } from '@angular/core';
  import { AbstractControl, FormControl } from '@angular/forms';
  import { IonInput } from '@ionic/angular';
  
  @Component({
    selector: 'bc-text-area',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.scss'],
  })
  export class TextAreaComponent implements OnInit, AfterViewInit {
    @ViewChild('contentWrapper') contentWrapper!: ElementRef;
    @ViewChild(IonInput) ionInput!: IonInput;
    @Input() label = '';
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('control') _control!: AbstractControl | null;
  
    @Input() placeholder = '';
    @Input() type = 'text';
    @Input() readonly = false;
    @Input() showErrors = true;
    @Input() withDatepicker = false;
    @Input() datePickerOptions = {};
    @Input() inputmode = 'text';
  
    @Input() enterkeyhint = 'go';
  
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input()
    @HostBinding('style.--input-background')
    inputBackground = 'transparent';
  
    @HostBinding('style.--label-background')
    @Input()
    labelBackground!: string;
  
    @Input()
    inputPaddingStart = 16;
    @Input()
    inputPaddingEnd = 24;
  
    @HostBinding('class')
    @Input()
    theme: 'dark' | 'light' = 'light';
  
    @Input()
    @HostBinding('class.cursor-pointer')
    cursorPointer = false;
  
    showPassword = false;
    isPasswordInput = false;
  
    @HostBinding('class.with-icon')
    withIcon = false;
  
    constructor() {}
  
    ngOnInit() {
      if (this.type === 'password') {
        this.isPasswordInput = true;
      }
      if (!this.labelBackground) {
        this.labelBackground = this.theme === 'dark' ? '#ffffff' : '#004853';
      }
    }
  
    ngAfterViewInit() {
      setTimeout(
        () =>
          (this.withIcon = !!this.contentWrapper.nativeElement.childNodes.length),
      );
    }
  
    get control(): FormControl {
      return this._control as FormControl;
    }
  
    get hasError(): boolean {
      return this.control.invalid && this.control.dirty;
    }
  }
  