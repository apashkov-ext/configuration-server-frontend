import { Subject } from 'rxjs';
import { getErrorMessage } from './get-error-message';

export class Api {

  private _onError = new Subject<string>();
  get onError() {
    return this._onError.asObservable();
  }

  protected emitError(e: any) {
    this._onError.next(getErrorMessage(e));
  }
}
