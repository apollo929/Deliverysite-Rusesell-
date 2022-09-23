import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { JobFilter } from '@dfobobcat/graphql-types';

@Component({
  selector: 'bc-status-switcher-staff',
  templateUrl: './status-switcher-staff.component.html',
  styleUrls: ['./status-switcher-staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusSwitcherStaffComponent implements OnInit, OnDestroy {
  selectedStatus = new FormControl('');
  destroy$ = new Subject();
  JobFilter = JobFilter;
  @Output() selected: EventEmitter<JobFilter> = new EventEmitter();
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
