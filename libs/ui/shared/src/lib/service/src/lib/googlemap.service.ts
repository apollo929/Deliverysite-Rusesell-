import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable()
export class GoogleMapService {
  // This observable will emit the value when the Maps API is loaded
  // This is needed to make sure we don't access the API when it's not loaded yet
  mapsLoaded: Observable<boolean>;

  constructor(private httpClient: HttpClient) {
    this.mapsLoaded = httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=AIzaSyByxouTGVvMqZET_bucA07AIDF4kz-4AhA&libraries=places`,
        'callback',
      )
      .pipe(
        map(() => true),
        catchError(() => {
          return of(false);
        }),
      );
  }
}
