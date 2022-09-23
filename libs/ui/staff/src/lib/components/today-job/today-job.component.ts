import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
interface TodayJob {
  id: number;
  equipment: string;
  address: string;
}
@Component({
  selector: 'bc-today-job',
  templateUrl: './today-job.component.html',
  styleUrls: ['./today-job.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayJobComponent implements OnInit {
  @Input() job!: TodayJob;
  form!: FormGroup;
  @Output() clockOff = new EventEmitter<number>();
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.form = this.fb.group({
      id: [this.job?.id],
      equipment: [this.job?.equipment],
      address: [this.job?.address],
    });
  }
}
