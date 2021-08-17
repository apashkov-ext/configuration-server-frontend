import { ProjectDto } from '@/types/dto/project-dto';
import { Inject, Injectable, InjectionScopeEnum } from 'di-corate';
import { EMPTY, Subject } from 'rxjs';
import { CreateProjectDto } from './dto/create-project-dto';
import { CreatedProjectDto } from './dto/created-project-dto';
import { catchError } from 'rxjs/operators';
import { Api } from '@/core/api';
import { HttpClient } from '@/core/http-client';

@Injectable({
  scope: InjectionScopeEnum.Transient
})
export class ProjectsApi extends Api {
  private _projectsRetrieved = new Subject<ProjectDto[]>();
  get projectsRetrieved() {
    return this._projectsRetrieved.asObservable();
  }

  private _created = new Subject<CreatedProjectDto>();
  get created() {
    return this._created.asObservable();
  }

  private _deleted = new Subject<{ id: string }>();
  get deleted() {
    return this._deleted.asObservable();
  }

  constructor(@Inject(HttpClient) protected readonly client: HttpClient) {
    super();
  }

  retrieveProjects() {
    this.client.get<ProjectDto[]>('projects')
      .pipe(catchError(e => {
        this.emitError(e);
        return EMPTY;
      }))
      .subscribe(res => this._projectsRetrieved.next(res));
  }

  create(name: string) {
    const req = { name } as CreateProjectDto;

    this.client.post<CreatedProjectDto>('projects', req)
      .pipe(catchError(e => {
        this.emitError(e);
        return EMPTY;
      }))
      .subscribe(res => this._created.next(res));
  }

  deleteProject(id: string) {
    this.client.delete(`projects/${id}`)
      .pipe(catchError(e => {
        this.emitError(e);
        return EMPTY;
      }))
      .subscribe(() => this._deleted.next({ id }));
  }
}
