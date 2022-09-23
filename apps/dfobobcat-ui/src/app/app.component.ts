import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { LoadingService, StateService } from '@dfobobcat/ui/shared/service';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { AuthGuard } from './guards/auth.guard';
import { environment } from '../environments/environment';
import { TokenLoginGQL } from '@dfobobcat/graphql-types';
import { Location } from '@angular/common';
import { User } from '@dfobobcat/ui/shared/model';

const allowedRoutesMap: Record<string, any> = {
  builder: { route: [/^\/builder/, /^\/auth/], redirect: ['/builder', 'jobs'] },
  laborer: { route: [/^\/staff/, /^\/auth/], redirect: ['/staff', 'jobs'] },
  operator: { route: [/^\/staff/, /^\/auth/], redirect: ['/staff', 'jobs'] },
  admin: { route: [/^\/admin/], redirect: ['/builder', 'jobs'] },
};

@Component({
  selector: 'dfobobcat-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {
  destroy$: Subject<void> = new Subject();
  isAdmin$ = new BehaviorSubject<boolean>(false);
  isLoading$!: Observable<boolean>;
  constructor(
    private state: StateService,
    private loadingService: LoadingService,
    public alertController: AlertController,
    private router: Router,
    private authGuard: AuthGuard,
    private route: ActivatedRoute,
    private tokenLoginGQL: TokenLoginGQL,
    private location: Location,
  ) {}

  ngOnInit() {
    if (environment.production) {
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
    this.isLoading$ = this.state.select((state) => state.loading);
    const router$ = this.router.events.pipe(
      filter((event) => event instanceof RoutesRecognized),
      map((event) => event as RoutesRecognized),
    );
    const user$ = this.state
      .select((state) => state.user)
      .pipe(distinctUntilChanged());

    combineLatest([router$, user$]).subscribe(([routerEvent, user]) => {
      const url = routerEvent.urlAfterRedirects;

      const query = url.split('?');
      const regexpMatch = query[1] && query[1].match(/login_token=(.*)/);
      if (!user && regexpMatch && regexpMatch[1]) {
        const login_token = regexpMatch[1];

        return this.tokenLoginGQL
          .mutate({
            token: login_token,
          })
          .subscribe((result) => {
            if (!result || !result.data) {
              return false;
            }
            const { name, email } = result.data.tokenLogin;
            const role = result.data.tokenLogin.role.name;
            const user: User = {
              name,
              role: role,
              email,
            };
            this.state.setState('user', user, true).subscribe();
            this.router.navigate([], {
              queryParams: {
                login_token: null,
              },
              queryParamsHandling: 'merge',
            });
            return false;
          });
      }

      if (!this.isSubPage(url, /^\/auth/) && user?.role === 'admin') {
        this.isAdmin$.next(true);
      } else {
        this.isAdmin$.next(false);
      }

      if ((!user || !user.role) && !this.isSubPage(url, /^\/auth/)) {
        this.router.navigate(['/auth', 'login']);
        return;
      }

      if (this.isSubPage(url, /^\/auth/) && user) {
        let redirect: string[] = [];
        switch (user.role) {
          case 'admin': {
            redirect = ['/admin'];
            break;
          }
          case 'builder': {
            redirect = ['/builder'];
            break;
          }
          case 'operator':
          case 'laborer': {
            redirect = ['/staff'];
            break;
          }
        }
        this.router.navigate(redirect);
        return;
      }

      if (user && user.role) {
        const allowed = allowedRoutesMap[user.role];
        if (!allowed.route.some((route: RegExp) => url.match(route))) {
          this.router.navigate(allowed.redirect);
          return;
        }
      }
      return;
    });
  }

  private isSubPage(url: string, parent: RegExp) {
    return url.match(parent);
  }
  async ngAfterViewInit() {
    this.state
      .select((state) => state.loading)
      .pipe(
        takeUntil(this.destroy$),
        concatMap((showLoading) => {
          if (showLoading) {
            return this.loadingService.show();
          } else {
            return this.loadingService.dismiss();
          }
        }),
      )
      .subscribe();

    this.state
      .select((state) => state.errorMessage)
      .pipe(
        filter((errorMessage) => !!errorMessage),
        takeUntil(this.destroy$),
        tap(async (errorMessage) => {
          const alert = await this.alertController.create({
            cssClass: 'bc-error-popup',
            header: 'Error',
            message: errorMessage,
            buttons: ['Dismiss'],
          });

          await alert.present();
        }),
      )
      .subscribe();
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
}
