import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, from, Observable } from 'rxjs';
import {
  concatMap,
  filter,
  take,
} from 'rxjs/operators';

@Injectable()
export class StorageService {
  private _storage: any = null;
  storageCreated$ = new BehaviorSubject(false);

  constructor(private storage: Storage) {
    from(this.storage.create())
      .pipe(take(1))
      .subscribe((storage) => {
        this._storage = storage;
        this.storageCreated$.next(true);
      });
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any): Observable<unknown> {
    return this.storageCreated$.pipe(
      filter((created) => created),
      concatMap(() => from(this._storage?.set(key, value))),
    );
  }

  public get<T>(key: string): Observable<T> {
    return this.storageCreated$.pipe(
      filter((created) => created),
      concatMap(() => from(this._storage?.get(key)) as Observable<T>),
    );
  }
}
