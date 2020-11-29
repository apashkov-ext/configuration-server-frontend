import { ProjectDto } from '@/types/dto/project-dto';
import { RequestException } from '@/exceptions/request-exception';
import { Project, Configuration } from '@/types';
import { Inject, Injectable } from 'di-corate';
import { ProjectsApi, HttpClient } from '../abstractions';

@Injectable()
export class DefaultProjectsApi implements ProjectsApi {

    constructor(@Inject('HttpClient') private http: HttpClient) {
        
    }

    async projects(): Promise<Project[]> {
        const res = await this.http.get<ProjectDto[]>('projects');
        return res.map(p => new Project(p.name, p.configurations.map(c => new Configuration(c.environment, c.data))));
    }
  
    async createProject(name: string): Promise<Project> {
        const req = {
            name
        };

        let res: ProjectDto;
        
        try {
            res = await this.http.post<ProjectDto>('projects', req);
        } catch (e) {
            throw new RequestException(e.message);
        }

        return new Project(res.name, res.configurations.map(m => new Configuration(m.environment, m.data)));
    }
  
    async deleteProject(name: string): Promise<void> {
        await this.http.delete(`projects/${name}`);
    }
}