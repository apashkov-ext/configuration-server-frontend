import { AxiosInstance } from 'axios';
import axios from 'axios';
import { Injectable } from '../di/decorators/injectable';

@Injectable()
export class HttpClient {
    private readonly instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        this.instance.interceptors.response.use(response => response, error => {
            const message = this.getMessage(error);
            // Toast.toastError(message, this);
        });
    }

    get get() {
        return this.instance.get;
    }

    get post() {
        return this.instance.post;
    }

    get put() {
        return this.instance.put;
    }

    get delete() {
        return this.instance.delete;
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
