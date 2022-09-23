import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { JobStatus } from '@dfobobcat/graphql-types';

@Component({
  selector: 'bc-status-selector',
  templateUrl: './status-selector.component.html',
  styleUrls: ['./status-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusSelectorComponent implements OnDestroy, OnInit {
  selectedStatus = new FormControl('');
  destroy$ = new Subject();
  jobStatus = JobStatus;
  @Output() selected: EventEmitter<JobStatus> = new EventEmitter();
  @Input() initial = '';
  constructor() {}
  ngOnInit() {
    this.selectedStatus.setValue(this.initial);
    this.selectedStatus.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((value) => this.selected.emit(value));
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
}
