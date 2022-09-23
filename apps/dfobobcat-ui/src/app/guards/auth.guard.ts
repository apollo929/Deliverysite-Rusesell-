import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from '@dfobobcat/ui/shared/service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private stateService: StateService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.stateService
      .select((state) => state.user)
      .pipe(
        map((user) => {
          if (user) {
            return true;
          }
          return false;
        }),
      );
  }
}
