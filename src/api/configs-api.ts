import { AxiosInstance } from 'axios';
import { HttpClient } from './http-client';
import { Configuration } from '@/types/configuration';
import { ConfigurationDto } from '@/types/dto/configuration-dto';

export class ConfigsApi {
    private readonly http: AxiosInstance;

    constructor() {
        const headers = {
            // "Authorization": `token ${personalToken}`,
            // "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
          };

          this.http = HttpClient.create("https://configuration-server-api.herokuapp.com", headers);
    }

    async addConfiguration(projName: string, envName: string): Promise<Configuration> {
        const req = {
            env: envName
        };

        const res = await this.http.post<ConfigurationDto>(`projects/${projName}/configs`, req);
        return new Configuration(res.data.environment, res.data.data);
    }

    async removeConfiguration(projName: string, envName: string): Promise<void> {
        await this.http.delete(`projects/${projName}/configs/${envName}`);
    }
  
    async updateConfiguration(projName: string, envName: string, data: string): Promise<void> {
        await this.http.put(`projects/${projName}/configs/${envName}`, data);
    }
}