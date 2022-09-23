import { Injectable } from '@angular/core';
import { AlertServiceConfig } from '@dfobobcat/ui/shared/model';
import { AlertController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable()
export class AlertService {
  constructor(private alertController: AlertController) {}

  show(config: AlertServiceConfig): Observable<void> {
    const headerOptions = {
      warning: 'Warning',
      success: 'Success',
      error: 'Error',
    };
    const alert = this.alertController.create({
      cssClass: 'bc-alert-popup',
      header: headerOptions[config.type ? config.type : 'success'],
      message: config.message,
      buttons: ['Dismiss'],
    });
    return from(alert).pipe(concatMap((alert) => from(alert.present())));
  }
}
