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
import { AddBuilderDialogComponent } from '../../dialog/add-builder-dialog/add-builder-dialog.component';
import { AlertController } from '@ionic/angular';
import { ORDER_DIRECTION } from '@dfobobcat/ui/shared/model';
import { SearchService } from '../../../../../shared/src/lib/service/src';

@Component({
  selector: 'dfobobcat-admin-user-builder',
  templateUrl: './admin-user-builder.component.html',
  styleUrls: ['./admin-user-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUserBuilderComponent implements OnInit, OnDestroy {
  @ViewChild('componentWrapper', { read: ElementRef })
  componentWrapper!: ElementRef;
  dialogRef!: OverlayRef;

  dataSource$ = new BehaviorSubject<UsersQuery['users']['items']>([]);

  displayedColumns = ['photo', 'name', 'email','company', 'edit', 'delete'];

  ORDER_DIRECTION = ORDER_DIRECTION;
  orderKeys = {
    'user.name': 'Name',
    'user.email': 'Email',
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
    private deleteUserGQL: DeleteUserGQL,
    private alertController: AlertController,
    private overlay: Overlay,
    private injector: Injector,
    private alertService: AlertService,
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
          role: 'builder',
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
      AddBuilderDialogComponent,
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
                message: 'Builder created!',
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
      AddBuilderDialogComponent,
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
                message: 'Builder edited!',
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
