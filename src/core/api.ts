import { PropInject } from 'di-corate';
import { Subject } from 'rxjs';
import { getErrorMessage } from './get-error-message';
import { HttpClient } from './http-client';

export class Api {
  @PropInject(HttpClient) protected readonly client!: HttpClient;

  private _onError = new Subject<string>();
  get onError() {
    return this._onError.asObservable();
  }

  protected emitError(e: any) {
    this._onError.next(getErrorMessage(e));
  }
}
