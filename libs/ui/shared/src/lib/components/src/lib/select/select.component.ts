import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AnimationController } from '@ionic/angular';
@Component({
  selector: 'bc-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @ViewChild('selectOptions') selectOptions!: ElementRef;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() options!: Record<number, string>;

  @Output() selected: EventEmitter<number[]> = new EventEmitter();

  @HostBinding('class')
  @Input()
  theme: 'dark' | 'light' = 'light';
  @Input()
  multiple = false;
  @Input()
  readonly = true;
  @Input()
  @HostBinding('style.--input-background')
  inputBackground = 'transparent';
  selectedItems: number[] = [];

  @Input()
  control!: FormControl;

  @Input()
  triggerCD!: EventEmitter<void>;

  optionsControls: Array<[string, string, FormControl]> = [];

  optionsActive = false;
  constructor(
    private animationCtrl: AnimationController,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    for (const [id, label] of Object.entries(this.options)) {
      this.optionsControls.push([id, label, new FormControl(false)]);
    }
    if (this.triggerCD) {
      this.triggerCD.subscribe(() => {
        this.cdRef.markForCheck();
      });
    }
  }

  get hasError(): boolean {
    if (!this.control) {
      return false;
    }
    return this.control.invalid && this.control.dirty;
  }

  selectChanged(): void {
    let newValue = '';
    const selected = this.optionsControls.filter((item) => item[2].value);
    for (const [idx, item] of selected.entries()) {
      const cc = selected.length - 1 == idx ? '' : ', ';
      newValue += item[1] + cc;
    }
    this.selected.emit(selected.map((item) => +item[0]));
    this.control.setValue(newValue);
  }

  singleSelect(id: number) {
    this.selected.next([+id]);
    this.control.setValue(this.options[+id]);
    this.toggleOptions();
  }

  async toggleOptions() {
    this.optionsActive = !this.optionsActive;
    if (this.optionsActive) {
      this.renderer.setStyle(
        this.selectOptions.nativeElement,
        'display',
        'block',
      );
      await this.animationCtrl
        .create()
        .addElement(this.selectOptions.nativeElement)
        .duration(200)
        .fromTo('opacity', 0, 1)
        .play();
    } else {
      await this.animationCtrl
        .create()
        .addElement(this.selectOptions.nativeElement)
        .duration(200)
        .fromTo('opacity', 1, 0)
        .play();
      this.renderer.setStyle(
        this.selectOptions.nativeElement,
        'display',
        'none',
      );
    }
  }
}
