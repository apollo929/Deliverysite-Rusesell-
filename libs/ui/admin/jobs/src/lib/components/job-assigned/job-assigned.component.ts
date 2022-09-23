import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  Injector,
} from '@angular/core';
import * as moment from 'moment';
import { JobsQuery, JobStatus } from '@dfobobcat/graphql-types';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { take } from 'rxjs/operators';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ClockoffDialogComponent } from '../../dialog/clockoff-dialog/clockoff-dialog.component';
import {
  ClockOffDialogConfig,
  CLOCKOFF_DIALOG_CONFIG,
} from '@dfobobcat/ui/feature/admin/shared/model';
import { merge, Subject } from 'rxjs';

@Component({
  selector: 'bc-job-assigned',
  templateUrl: './job-assigned.component.html',
  styleUrls: ['./job-assigned.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobAssignedComponent {
  @Input() job!: JobsQuery['jobs']['items'][number];
  @Output() update = new EventEmitter<void>();
  destroy$ = new Subject<undefined>();

  dialogRef!: OverlayRef;

  jobStatus = JobStatus;

  constructor(private overlay: Overlay, private injector: Injector) {}

  get equipment() {
    return Array.isArray(this.job.equipment)
      ? this.job.equipment.map((item) => item.name).join(', ')
      : [];
  }

  get date() {
    return moment(this.job.requestDate).utc().format('MMM D, dddd');
  }

  showClockOffModal() {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const scrollStrategy = this.overlay.scrollStrategies.close();

    this.dialogRef = this.overlay.create(
      new OverlayConfig({
        disposeOnNavigation: true,
        scrollStrategy,
        positionStrategy,
        hasBackdrop: false,
        panelClass: 'bc-dialog',
        backdropClass: 'bc-dialog-backdrop',
      }),
    );
    const portal = new ComponentPortal(
      ClockoffDialogComponent,
      null,
      this.createInjector({ job: this.job }),
    );
    const componentRef = this.dialogRef.attach(portal);
    merge(
      this.destroy$,
      componentRef.instance.unassigned.pipe(take(1)),
    ).subscribe((hasUnAssigned: boolean | undefined) => {
      this.dialogRef.dispose();
      if (hasUnAssigned) {
        this.update.next();
      }
    });

    merge(
      this.destroy$,
      componentRef.instance.updateRequestDate.pipe(take(1)),
    ).subscribe((hasUpdated: boolean | undefined) => {
      this.dialogRef.dispose();
      if (hasUpdated) {
        this.update.next();
      }
    });
    componentRef.instance.close.pipe(take(1)).subscribe(() => {
      this.dialogRef.dispose();
    });
  }

  private createInjector(options: ClockOffDialogConfig): PortalInjector {
    const weakMap = new WeakMap<any, any>([[CLOCKOFF_DIALOG_CONFIG, options]]);
    return new PortalInjector(this.injector, weakMap);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
