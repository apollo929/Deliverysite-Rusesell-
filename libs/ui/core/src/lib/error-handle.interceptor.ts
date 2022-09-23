import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { AlertService, StateService } from '@dfobobcat/ui/shared/service';
import { Router } from '@angular/router';
@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    private router: Router,
    private stateService: StateService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(req).pipe(
      concatMap((resp: any) => {
        let errors = '';
        const errData = resp?.body?.errors;
        if (
          Array.isArray(errData) &&
          errData.length === 1 &&
          errData[0]?.statusCode === 403
        ) {
          this.stateService.setState('user', undefined, true).subscribe();

          this.router.navigate(['/auth', 'login']);
          return throwError(resp);
        }
        if (Array.isArray(errData) && errData.length) {
          errors = errData
            .map((item: { message: string }) => item.message)
            .join(' ');
          this.alertService
            .show({
              message: errors,
              type: 'error',
            })
            .subscribe();
          return throwError(resp);
        }
        return of(resp);
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }
}
