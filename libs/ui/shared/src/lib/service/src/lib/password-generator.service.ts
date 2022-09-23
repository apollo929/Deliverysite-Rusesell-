import { Injectable } from '@angular/core';

// https://stackoverflow.com/a/26528271

@Injectable()
export class PasswordGeneratorService {
  // eslint-disable-next-line no-useless-escape
  private _pattern = /[a-zA-Z0-9_\-\+\.]/;

  private _getRandomByte() {
    // http://caniuse.com/#feat=getrandomvalues
    if (window.crypto && window.crypto.getRandomValues) {
      const result = new Uint8Array(1);
      window.crypto.getRandomValues(result);
      return result[0];
    } else if (
      (window as any).msCrypto &&
      (window as any).msCrypto.getRandomValues
    ) {
      const result = new Uint8Array(1);
      (window as any).msCrypto.getRandomValues(result);
      return result[0];
    } else {
      return Math.floor(Math.random() * 256);
    }
  }

  generate(length: number = 12) {
    // eslint-disable-next-line prefer-spread
    return Array(length)
      .fill(undefined)
      .map(() => {
        let result;
        // eslint-disable-next-line no-constant-condition
        while (true) {
          result = String.fromCharCode(this._getRandomByte());
          if (this._pattern.test(result)) {
            return result;
          }
        }
      })
      .join('');
  }
}
