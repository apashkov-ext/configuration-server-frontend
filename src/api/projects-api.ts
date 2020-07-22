import { ProjectDto } from '@/types/dto/project-dto';
import { HttpClient } from './http-client';
import { AxiosInstance, AxiosResponse } from 'axios';
import { RequestException } from '@/exceptions/request-exception';
import { Project } from '@/types/project';
import { Configuration } from '@/types/configuration';

export class ProjectsApi {
    private readonly http: AxiosInstance;

    constructor() {
        const headers = {
            // "Authorization": `token ${personalToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
          };

          this.http = HttpClient.create("https://configuration-server-api.herokuapp.com", headers);
    }

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