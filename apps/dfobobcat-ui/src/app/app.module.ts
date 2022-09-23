import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiCoreModule } from '@dfobobcat/ui/core';
import {
  StorageService,
  StateService,
  ConfigService,
  PasswordGeneratorService,
} from '@dfobobcat/ui/shared/service';
import { AuthGuard } from './guards/auth.guard';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    UiCoreModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StorageService,
    StateService,
    AuthGuard,
    PasswordGeneratorService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private config: ConfigService) {
    config.init({
      beGraphqlUrl: environment.beGraphqlUrl,
      beUrl: environment.beUrl,
      production: environment.production,
    });
  }
}
