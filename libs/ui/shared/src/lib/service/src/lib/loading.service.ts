import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { from, Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable()
export class LoadingService {
  loading!: HTMLIonLoadingElement;
  constructor(public loadingController: LoadingController) {}
  show(): Observable<void> {
    return from(
      this.loadingController.create({
        cssClass: 'bc-loading-popup',
        message: 'Please wait...',
      }),
    ).pipe(
      concatMap((loading: HTMLIonLoadingElement) => {
        this.loading = loading;
        return from(this.loading.present());
      }),
    );
  }
  dismiss(): Observable<undefined | boolean> {
    if (this.loading) {
      return from(this.loading.dismiss());
    }
    return of();
  }
}
