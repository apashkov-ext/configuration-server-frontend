import { AxiosInstance } from 'axios';
import axios from 'axios';
import { Inject, Injectable } from 'di-corate';
import { BusyOverlay } from './busy-overlay';
import { Toastr } from './toastr';
import { getErrorMessage } from './get-error-message';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpClient implements HttpClient {
  private readonly instance: AxiosInstance;

  constructor(@Inject(Toastr) toastr: Toastr, @Inject(BusyOverlay) busy: BusyOverlay) {
    this.instance = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    this.instance.interceptors.response.use(
      response => response,
      error => {
        if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
          return Promise.reject(error);
        }
        const message = getErrorMessage(error);
        toastr.error(message);
        busy.hideBusy();
        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, errorHandled = false): Observable<T> {
    return from(this.instance.get<T>(url, { errorHandled } as any)).pipe(map(m => m.data));
  }

  post<T>(url: string, data?: any, errorHandled = false): Observable<T> {
    return from(this.instance.post<T>(url, data, { errorHandled } as any)).pipe(map(m => m.data));
  }

  put(url: string, data?: any, errorHandled = false): Observable<void> {
    return from(this.instance.put<void>(url, data, { errorHandled } as any)).pipe(map(() => undefined));
  }

  delete(url: string, errorHandled = false): Observable<void> {
    return from(this.instance.delete(url, { errorHandled } as any)).pipe(map(() => undefined));
  }
}
