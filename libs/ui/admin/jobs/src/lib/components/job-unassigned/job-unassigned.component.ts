import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  Injector,
  OnDestroy,
} from '@angular/core';
import * as moment from 'moment';
import { JobsQuery } from '@dfobobcat/graphql-types';
import { ClockoffDialogComponent } from '../../dialog/clockoff-dialog/clockoff-dialog.component';
import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  ConnectionPositionPair,
} from '@angular/cdk/overlay';
import { AssignJobDialogComponent } from '../../dialog/assign-job-dialog/assign-job-dialog.component';
import { take } from 'rxjs/operators';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import {
  AssignStaffDialogConifg,
  ASSIGN_STAFF_DIALOG_CONFIG,
  ClockOffDialogConfig,
  CLOCKOFF_DIALOG_CONFIG,
} from '@dfobobcat/ui/feature/admin/shared/model';
import { merge, Subject } from 'rxjs';
@Component({
  selector: 'bc-job-unassigned',
  templateUrl: './job-unassigned.component.html',
  styleUrls: ['./job-unassigned.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobUnassignedComponent implements OnDestroy {
  constructor(private overlay: Overlay, private injector: Injector) { }

  @ViewChild('jobCard', { read: ElementRef }) cardContentRef!: ElementRef;

  dialogRef!: OverlayRef;

  @Input() job!: JobsQuery['jobs']['items'][number];

  @Output()
  update = new EventEmitter<void>();

  destroy$ = new Subject<undefined>();

  get equipment() {
    return Array.isArray(this.job.equipment)
      ? this.job.equipment.map((item) => item.name).join(', ')
      : [];
  }

  get date() {
    return moment(this.job.requestDate).utc().format('MMM D, dddd');
  }

  showModal() {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.cardContentRef)
      .withPositions([
        new ConnectionPositionPair(
          { originX: 'center', originY: 'top' },
          { overlayX: 'center', overlayY: 'top' },
        ),
      ]);
    const scrollStrategy = this.overlay.scrollStrategies.close();

    this.dialogRef = this.overlay.create(
      new OverlayConfig({
        disposeOnNavigation: true,
        scrollStrategy,
        positionStrategy,
        hasBackdrop: false,
        panelClass: 'bc-dialog',
        backdropClass: 'bc-dialog-backdrop',
        height: 327,
      }),
    );
    const portal = new ComponentPortal(
      AssignJobDialogComponent,
      null,
      this.createInjector({
        jobId: this.job.id,
      }),
    );
    const componentRef = this.dialogRef.attach(portal);
    merge(this.destroy$, componentRef.instance.close.pipe(take(1))).subscribe(
      (hasAssigned: boolean | undefined) => {
        this.dialogRef.dispose();
        if (hasAssigned) {
          this.update.next();
        }
      },
    );
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
      this.createInjector1({ job: this.job }),
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

    merge(this.destroy$,
      componentRef.instance.updateRequestDate.pipe(take(1)),
    ).subscribe((hasUpdated: boolean | undefined) => {
      this.dialogRef.dispose();
      if (hasUpdated) {
        this.update.next();
      }
    });
    componentRef.instance.close.pipe(take(1))
      .subscribe(() => {
        this.dialogRef.dispose();
      });
  }

  private createInjector(options: AssignStaffDialogConifg): PortalInjector {
    const weakMap = new WeakMap<any, any>([
      [ASSIGN_STAFF_DIALOG_CONFIG, options],
    ]);
    return new PortalInjector(this.injector, weakMap);
  }

  private createInjector1(options: ClockOffDialogConfig): PortalInjector {
    const weakMap = new WeakMap<any, any>([[CLOCKOFF_DIALOG_CONFIG, options]]);
    return new PortalInjector(this.injector, weakMap);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
