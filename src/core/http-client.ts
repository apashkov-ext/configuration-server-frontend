import { AxiosInstance } from 'axios';
import axios from 'axios';
import { Inject, Injectable } from 'di-corate';
import { BusyOverlay } from './busy-overlay';
import { Toastr } from './toastr';
import { getErrorMessage } from './get-error-message';

@Injectable()
export class HttpClient implements HttpClient {
  private readonly instance: AxiosInstance;

  constructor(
    @Inject('Toastr') toastr: Toastr,
    @Inject('BusyOverlay') busy: BusyOverlay
  ) {
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
        // if( error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false ) {
        //     return Promise.reject(error);
        // }
        const message = getErrorMessage(error);
        toastr.error(message);
        busy.hideBusy();
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, errorHandled = false): Promise<T> {
    const resp = await this.instance.get<T>(url, { errorHandled } as any);
    return resp.data;
  }

  async post<T>(url: string, data?: any, errorHandled = false): Promise<T> {
    const resp = await this.instance.post<T>(url, data, {
      errorHandled
    } as any);
    return resp.data;
  }

  async put(url: string, data?: any, errorHandled = false): Promise<void> {
    await this.instance.put(url, data, { errorHandled } as any);
  }

  async delete(url: string, errorHandled = false): Promise<void> {
    await this.instance.delete(url, { errorHandled } as any);
  }
}
