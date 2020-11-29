import { Configuration } from '@/types';
import { ConfigurationDto } from '@/types/dto/configuration-dto';
import { Inject, Injectable } from 'di-corate';
import { ConfigsApi, HttpClient } from '../abstractions';

@Injectable()
export class DefaultConfigsApi implements ConfigsApi {
    constructor(@Inject('HttpClient') private http: HttpClient) { }

    async addConfiguration(projName: string, envName: string): Promise<Configuration> {
        const req = {
            env: envName
        };

        const res = await this.http.post<ConfigurationDto>(`projects/${projName}/configs`, req);
        return new Configuration(res.environment, res.data);
    }

    async removeConfiguration(projName: string, envName: string): Promise<void> {
        await this.http.delete(`projects/${projName}/configs/${envName}`);
    }
  
    async updateConfiguration(projName: string, envName: string, data: string): Promise<void> {
        await this.http.put(`projects/${projName}/configs/${envName}`, data);
    }
}