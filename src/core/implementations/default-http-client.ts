import { AxiosInstance } from 'axios';
import axios from 'axios';
import { Inject, Injectable } from 'di-corate';
import { HttpClient } from '../abstractions';
import { Toastr } from '../abstractions/toastr';

@Injectable()
export class DefaultHttpClient implements HttpClient {
    private readonly instance: AxiosInstance;

    constructor(@Inject('Toastr') private readonly toastr: Toastr) {
        this.instance = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        this.instance.interceptors.response.use(response => response, error => {
            const message = this.getMessage(error);
            this.toastr.error(message);
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

        return e.response.data.message;
    }
}
