import { Configuration } from '@/types/configuration';
import { ConfigurationDto } from '@/types/dto/configuration-dto';
import { SupportsInjection } from 'good-injector';
import { HttpClient } from '@/core/services/http-client';
import { Inject } from '@/core/di/decorators/inject';

@SupportsInjection
export class ConfigsApi {
    @Inject(HttpClient) private readonly http!: HttpClient

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