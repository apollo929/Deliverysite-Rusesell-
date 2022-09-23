import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiAuthModule } from '@dfobobcat/ui/feature/auth';
import { UiStaffModule } from '@dfobobcat/ui/feature/staff';
import { UiBuilderModule } from '@dfobobcat/ui/feature/builder';
import {
  HttpClientJsonpModule,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import {
  AlertService,
  ConfigService,
  GoogleMapService,
  LoadingService,
  SearchService,
} from '@dfobobcat/ui/shared/service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { ErrorHandleInterceptor } from './error-handle.interceptor';
// import { environment } from '@ui/environment';
import { UiAdminShellModule } from '@dfobobcat/ui/feature/admin/shell';
import { HttpLoadingInterceptor } from './http-loading.interceptor';
@NgModule({
  imports: [
    CommonModule,
    UiAuthModule,
    UiBuilderModule,
    UiStaffModule,
    UiAdminShellModule,
    HttpClientModule,
    HttpClientJsonpModule,
    IonicStorageModule.forRoot({
      driverOrder: [Drivers.LocalStorage],
    }),
  ],
  providers: [
    LoadingService,
    AlertService,
    GoogleMapService,
    SearchService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink, config: ConfigService) => {
        return {
          cache: new InMemoryCache({
            addTypename: false,
          }),
          queryDeduplication: false,
          defaultOptions: {
            watchQuery: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'ignore',
            },
            query: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'none',
            },
            mutate: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'none',
            },
          },
          link: httpLink.create({
            uri: config.get('beGraphqlUrl'),
            withCredentials: true,
          }),
        };
      },
      deps: [HttpLink, ConfigService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandleInterceptor,
      multi: true,
    },
  ],
})
export class UiCoreModule {}
