import { Api } from '@/core/api';
import { HttpClient } from '@/core/http-client';
import { EnvironmentDto } from '@/types/dto/environment-dto';
import { Inject, Injectable, InjectionScopeEnum } from 'di-corate';
import { EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateEnvironmentDto } from './dto/create-environment-dto';

@Injectable({
    scope: InjectionScopeEnum.Transient
  })
export class EnvironmentsApi extends Api {
    private _created = new Subject<EnvironmentDto>();
    get created() {
      return this._created.asObservable();
    }
  
    private _deleted = new Subject<{ id: string, projectId: string }>();
    get deleted() {
      return this._deleted.asObservable();
    }
  
    constructor(@Inject(HttpClient) protected readonly client: HttpClient) {
      super();
    }

    create(name: string, projectId: string) {
        const req = { project: projectId, name } as CreateEnvironmentDto;

        this.client.post<EnvironmentDto>('environments', req)
            .pipe(catchError(e => {
                this.emitError(e);
                return EMPTY;
            }))
            .subscribe(res => this._created.next(res));
    }

    delete(id: string, projectId: string) {
        this.client.delete(`environments/${id}`)
            .pipe(catchError(e => {
                this.emitError(e);
                return EMPTY;
            }))
            .subscribe(() => this._deleted.next({ id, projectId }));
    }
}