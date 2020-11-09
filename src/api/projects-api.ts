import { ProjectDto } from '@/types/dto/project-dto';
import { AxiosResponse } from 'axios';
import { RequestException } from '@/exceptions/request-exception';
import { Project } from '@/types/project';
import { Configuration } from '@/types/configuration';
import { SupportsInjection } from 'good-injector';
import { HttpClient } from '@/core/services/http-client';
import { Inject } from '@/core/di/decorators/inject';

@SupportsInjection
export class ProjectsApi {
    @Inject(HttpClient) private readonly http!: HttpClient

    async projects(): Promise<Project[]> {
        const res = await this.http.get<ProjectDto[]>('projects');
        return res.data.map(p => new Project(p.name, p.configurations.map(c => new Configuration(c.environment, c.data))));
    }
  
    async createProject(name: string): Promise<Project> {
        const req = {
            name
        };

        let res: AxiosResponse<ProjectDto>;
        
        try {
            res = await this.http.post<ProjectDto>('projects', req);
        } catch (e) {
            throw new RequestException(e.message);
        }

        return new Project(res.data.name, res.data.configurations.map(m => new Configuration(m.environment, m.data)));
    }
  
    async deleteProject(name: string): Promise<void> {
        await this.http.delete(`projects/${name}`);
    }
}