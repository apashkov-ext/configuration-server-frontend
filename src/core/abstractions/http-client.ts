export interface HttpClient {
    get<T>(url: string): Promise<T>;
    post<T>(url: string, data?: any): Promise<T>;
    put(url: string, data?: any): Promise<void>;
    delete(url: string): Promise<void>;
}