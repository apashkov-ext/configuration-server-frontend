import { Api } from '@/core/api';
import { HttpClient } from '@/core/http-client';
import { OptionGroupDto } from '@/types/dto/option-group-dto';
import { Inject, Injectable, InjectionScopeEnum } from 'di-corate';
import { EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateOptionGroupDto } from './dto/create-group-dto';
import { UpdateOptionGroupDto } from './dto/update-option-group-dto';

@Injectable({
  scope: InjectionScopeEnum.Transient
})
export class OptionGroupsApi extends Api {
  private _created = new Subject<{ id: string; name: string; description: string; }>();
  get created() {
    return this._created.asObservable();
  }

  private _updated = new Subject<{ name: string; description: string }>();
  get updated() {
    return this._updated.asObservable();
  }

  private _deleted = new Subject<{ id: string }>();
  get deleted() {
    return this._deleted.asObservable();
  }

  constructor(@Inject(HttpClient) protected readonly client: HttpClient) {
    super();
  }

  create(parentId: string, name: string) {
    const r = {
      parent: parentId,
      name,
      description: ''
    } as CreateOptionGroupDto;
    this.client
      .post<OptionGroupDto>(`option-groups`, r)
      .pipe(catchError(e => {
        this.emitError(e);
        return EMPTY;
      }))
      .subscribe(x => {
        this._created.next({ id: x.id, name: x.name, description: '' });
      });
  }

  update(id: string, name: string, description: string) {
    const r = { name, description } as UpdateOptionGroupDto;
    this.client
      .put(`option-groups/${id}`, r)
      .pipe(catchError(e => {
        this.emitError(e);
        return EMPTY;
      }))
      .subscribe(() => this._updated.next(r));
  }

  delete(id: string) {
    this.client
      .delete(`option-groups/${id}`)
      .pipe(catchError(e => {
        this.emitError(e);
        return EMPTY;
      }))
      .subscribe(() => this._deleted.next({ id }));
  }
}
