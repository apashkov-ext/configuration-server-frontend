import { Api } from '@/core/api';
import { HttpClient } from '@/core/http-client';
import { OptionGroupDto, UpdateOptionGroupDto } from '@/types/dto';
import { Inject, Injectable, InjectionScopeEnum } from 'di-corate';
import { EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateOptionGroupDto } from '@/types/dto';

@Injectable({
  scope: InjectionScopeEnum.Transient
})
export class OptionGroupsApi extends Api {
  private _loaded = new Subject<OptionGroupDto>();
  get loaded() {
    return this._loaded.asObservable();
  }

  private _created = new Subject<OptionGroupDto>();
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

  loadOptionGroup(id: string) {
    this.client.get<OptionGroupDto>(`option-groups/${id}`)
      .pipe(catchError(e => {
          this.emitError(e);
          return EMPTY;
      }))
      .subscribe(x => this._loaded.next(x));
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
        this._created.next(x);
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
