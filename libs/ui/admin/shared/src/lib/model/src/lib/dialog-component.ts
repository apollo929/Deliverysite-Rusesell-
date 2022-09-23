import { Subject } from 'rxjs';
import {
  Component,
} from '@angular/core';
@Component({ template: '' })
export class DialogComponent {
  constructor() {}
  close: Subject<void> = new Subject();
}
