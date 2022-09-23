import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { StateService } from '@dfobobcat/ui/shared/service';
@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  private requestsCount = 0;
  private blacklistedRoutes: string[] = [];

  constructor(private stateService: StateService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const isBlacklisted = this.blackList(req.url);
    if (!isBlacklisted) {
      this.requestsCount++;
      setTimeout(
        () => this.stateService.setState('loading', true).subscribe(),
        0,
      );
    }

    return next.handle(req).pipe(
      catchError((err) => {
        !isBlacklisted && this.removeRequest();
        return of(err);
      }),
      finalize(() => !isBlacklisted && this.removeRequest()),
    );
  }

  private removeRequest(): void {
    setTimeout(
      () =>
        this.stateService
          .setState(
            'loading',
            this.requestsCount === 0 ? false : --this.requestsCount > 0,
          )
          .subscribe(),
      0,
    );
  }

  private blackList(url: string): boolean {
    return this.blacklistedRoutes.some((path) => url.includes(path));
  }
}
