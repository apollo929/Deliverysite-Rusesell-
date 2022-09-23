import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  map,
  distinctUntilChanged,
  take,
  filter,
  concatMap,
} from 'rxjs/operators';
import { StorageService } from './storage.service';

import { User } from '@dfobobcat/ui/shared/model';

export interface AppState {
  loading: boolean;
  errorMessage: string | undefined;
  user: User | undefined;
}
const initialState: AppState = {
  loading: false,
  errorMessage: undefined,
  user: undefined,
};
@Injectable()
export class StateService {
  private state: AppState = initialState;
  private stateLoaded$ = new BehaviorSubject(false);
  private readonly stateSubject = new BehaviorSubject<AppState>(initialState);

  constructor(private storage: StorageService) {
    const userData = storage.get<User>('user');
    userData.pipe(take(1)).subscribe((user: User) => {
      this.state = { ...initialState, user };
      this.stateSubject.next({ ...initialState, user });

      if (typeof window !== 'undefined') {
        Object.defineProperty(window, 'appState', {
          get: () => this.stateSubject.value,
        });
      }
      this.stateLoaded$.next(true);
    });
  }

  setState<T extends keyof AppState>(
    key: T,
    value: AppState[T],
    writeStorage = false,
  ) {
    return this.stateLoaded$.pipe(
      filter((loaded) => loaded),
      concatMap(() => {
        this.state[key] = value;
        this.stateSubject.next(this.state);
        if (writeStorage) {
          return this.storage.set(key, value);
        } else {
          return of();
        }
      }),
    );
  }

  select<R>(selector: (state: AppState) => R): Observable<R> {
    return this.stateLoaded$.pipe(
      filter((loaded) => loaded),
      concatMap(() =>
        this.stateSubject.pipe(map(selector), distinctUntilChanged()),
      ),
    );
  }
}
