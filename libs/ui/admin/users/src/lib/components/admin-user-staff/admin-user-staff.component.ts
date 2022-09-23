import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Injector,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, combineLatest, from, Subject } from 'rxjs';
import { DeleteUserGQL, UsersGQL, UsersQuery } from '@dfobobcat/graphql-types';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { AddStaffDialogComponent } from '../../dialog/add-staff-dialog/add-staff-dialog.component';
import {
  concatMap,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  AddStaffDialogConfig,
  ADD_STAFF_DIALOG_CONFIG,
} from '@dfobobcat/ui/feature/admin/shared/model';
import { AlertService } from '@dfobobcat/ui/shared/service';
import { AlertController } from '@ionic/angular';
import { ORDER_DIRECTION } from '@dfobobcat/ui/shared/model';
import { SearchService } from '@dfobobcat/ui/admin/shared/service';
@Component({
  selector: 'dfobobcat-admin-user-staff',
  templateUrl: './admin-user-staff.component.html',
  styleUrls: ['./admin-user-staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUserStaffComponent implements OnInit, OnDestroy {
  @ViewChild('componentWrapper', { read: ElementRef })
  componentWrapper!: ElementRef;
  dialogRef!: OverlayRef;

  dataSource$ = new BehaviorSubject<UsersQuery['users']['items']>([]);
  displayedColumns = ['photo', 'name', 'email', 'role', 'edit', 'delete'];

  ORDER_DIRECTION = ORDER_DIRECTION;
  orderKeys = {
    'user.name': 'Name',
    'user.email': 'Email',
    'role.name': 'Role',
  };
  orderBy$ = new BehaviorSubject<string>('user.name');
  orderDirection$ = new BehaviorSubject<ORDER_DIRECTION>(ORDER_DIRECTION.DESC);
  hasNextPage$ = new BehaviorSubject<boolean>(false);
  hasPreviousPage$ = new BehaviorSubject<boolean>(false);
  previousPage: number | undefined;
  nextPage: number | undefined;
  paginate$ = new BehaviorSubject<number | undefined>(0);

  destroy$ = new Subject();

  constructor(
    private usersGQL: UsersGQL,
    private overlay: Overlay,
    private injector: Injector,
    private alertService: AlertService,
    private alertController: AlertController,
    private deleteUserGQL: DeleteUserGQL,
    private searchService: SearchService,
  ) {}
  ngOnInit(): void {
    combineLatest(
      this.orderBy$,
      this.orderDirection$,
      this.paginate$,
      this.searchService.search$,
    )
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.getUsers()),
      )
      .subscribe();
  }
  getUsers() {
    return combineLatest(
      this.orderBy$,
      this.orderDirection$,
      this.paginate$,
      this.searchService.search$,
    ).pipe(
      take(1),
      concatMap(([orderBy, orderDirection, page, search]) => {
        return this.usersGQL.fetch({
          role: 'staff',
          orderBy: `${orderDirection}${orderBy}`,
          pagination: {
            page,
          },
          search,
        });
      }),
      map((result) => result.data.users),
      tap((result) => {
        this.hasNextPage$.next(result.pageInfo.hasNextPage);
        this.hasPreviousPage$.next(result.pageInfo.hasPreviousPage);
        this.nextPage = result.pageInfo.nextPage;
        this.previousPage = result.pageInfo.previousPage;
        this.dataSource$.next(result.items);
      }),
    );
  }
  openStaffDialog() {
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
        hasBackdrop: true,
        panelClass: 'bc-dialog',
        backdropClass: 'bc-dialog-backdrop',
      }),
    );
    const portal = new ComponentPortal(
      AddStaffDialogComponent,
      null,
      this.createInjector({
        staffId: undefined,
      }),
    );
    const componentRef = this.dialogRef.attach(portal);
    componentRef.instance.close.pipe(take(1)).subscribe((actionDone) => {
      this.dialogRef.dispose();
      if (actionDone) {
        this.getUsers()
          .pipe(
            concatMap(() => {
              return this.alertService.show({
                type: 'success',
                message: 'Staff user created!',
              });
            }),
          )
          .subscribe();
      }
    });
  }
  openEditStaffDialog(staffId: number) {
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
        hasBackdrop: true,
        panelClass: 'bc-dialog',
        backdropClass: 'bc-dialog-backdrop',
      }),
    );
    const portal = new ComponentPortal(
      AddStaffDialogComponent,
      null,
      this.createInjector({
        staffId,
      }),
    );
    const componentRef = this.dialogRef.attach(portal);
    componentRef.instance.close.pipe(take(1)).subscribe((actionDone) => {
      this.dialogRef.dispose();
      if (actionDone) {
        this.getUsers()
          .pipe(
            concatMap(() => {
              return this.alertService.show({
                type: 'success',
                message: 'Staff user edited!',
              });
            }),
          )
          .subscribe();
      }
    });
  }

  async showDeleteAlert(
    userId: number,
    userName: string,
    idx: number,
  ): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'bc-alert-popup',
      header: 'Confirmation',
      message: `Delete user ${userName}?`,
      buttons: [
        {
          text: 'Yes',
          handler: this.deleteUser.bind(this, userId, idx),
          cssClass: 'action-yes',
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'action-no',
        },
      ],
    });

    from(alert.present()).subscribe();
  }

  deleteUser(userId: number, idx: number): void {
    this.deleteUserGQL
      .mutate({
        input: userId,
      })
      .pipe(
        concatMap(() => this.dataSource$),
        take(1),
      )
      .subscribe((result) => {
        result.splice(idx, 1);
        this.dataSource$.next(result);
      });
  }

  /**
   * if order is the same, change ordeer direction
   * otherwise, change order
   */
  changeSorting(newOrder: string) {
    combineLatest(this.orderBy$, this.orderDirection$)
      .pipe(take(1))
      .subscribe(([order, direction]) => {
        if (order === newOrder) {
          this.orderDirection$.next(
            direction === ORDER_DIRECTION.ASC
              ? ORDER_DIRECTION.DESC
              : ORDER_DIRECTION.ASC,
          );
        } else {
          this.orderBy$.next(newOrder);
        }
      });
  }

  private createInjector(options: AddStaffDialogConfig): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(ADD_STAFF_DIALOG_CONFIG, options);
    return new PortalInjector(this.injector, injectorTokens);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
