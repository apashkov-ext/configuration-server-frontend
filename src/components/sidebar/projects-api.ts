import { ProjectDto } from '@/types/dto/project-dto';
import { RequestException } from '@/exceptions/request-exception';
import { Inject, Injectable } from 'di-corate';
import { HttpClient } from '../../core/http-client';
import { Subject } from 'rxjs';
import { CreateProjectDto } from './dto/create-project-dto';
import { CreatedProjectDto } from './dto/created-project-dto';

@Injectable()
export class ProjectsApi {
  private _projectsRetrieved = new Subject<ProjectDto[]>();
  get projectsRetrieved() {
    return this._projectsRetrieved.asObservable();
  }

  private _created = new Subject<CreatedProjectDto>();
  get created() {
    return this._created.asObservable();
  }

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  retrieveProjects() {
    this.http
      .get<ProjectDto[]>('projects')
      .then(res => this._projectsRetrieved.next(res));
  }

  create(name: string) {
    const req = {
      name
    } as CreateProjectDto;

    this.http.post<CreatedProjectDto>('projects', req).then(
      res => this._created.next(res),
      e => {
        throw new RequestException(e.message);
      }
    );
  }

  async deleteProject(name: string): Promise<void> {
    await this.http.delete(`projects/${name}`);
  }
}
