import { AxiosInstance } from 'axios';
import axios from 'axios';
import { Inject, Injectable } from 'di-corate';
import { BusyOverlay } from './busy-overlay';
import { Toastr } from './toastr';

@Injectable()
export class HttpClient implements HttpClient {
    private readonly instance: AxiosInstance;

    constructor(@Inject('Toastr') toastr: Toastr, 
        @Inject('BusyOverlay') busy: BusyOverlay) {
        this.instance = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        this.instance.interceptors.response.use(response => {
            return response;
        }, error => {
            const message = this.getMessage(error);
            toastr.error(message);
            busy.hideBusy();
            return Promise.reject(error);
        });
    }

    async get<T>(url: string): Promise<T> {
        const resp =  await this.instance.get<T>(url);
        return resp.data;
    }

    async post<T>(url: string, data?: any): Promise<T> {
        const resp =  await this.instance.post<T>(url, data);
        return resp.data;
    }

    async put(url: string, data?: any): Promise<void> {
        await this.instance.put(url, data);
    }
    
    async delete(url: string): Promise<void> {
        await this.instance.delete(url);
    }

    private getMessage(e: any): string {
        if (e.message === 'Network Error') {
            return 'Server connection error';
        }

        if (!e.response) {
            return e.message
        }

        return this.aggregateErrors(e.response) || e.message;
    }

    private aggregateErrors(resp: any): string | null {
        if (resp.data.message) {
            return resp.data.message;
        }

        if (resp.errors && Array.isArray(resp.errors) && resp.errors.length) {
            return resp.errors[0] as string;
        }

        return null;
    }
}
