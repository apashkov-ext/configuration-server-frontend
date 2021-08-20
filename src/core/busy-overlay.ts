import { Injectable } from 'di-corate';
import { Subject } from 'rxjs';

@Injectable()
export class BusyOverlay {
  private _busyChanged = new Subject<boolean>();
  get busyChanged() {
    return this._busyChanged.asObservable();
  }

  showBusy() {
    this._busyChanged.next(true);
  }

  hideBusy() {
    this._busyChanged.next(false);
  }
}
