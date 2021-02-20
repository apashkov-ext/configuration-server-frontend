import { Inject, Injectable, InjectionScopeEnum } from 'di-corate';
import { UpdateOptionDto } from './dto/update-option-dto';
import { EMPTY, Subject } from 'rxjs';
import { OptionValueType } from '@/types/option-value-type.enum';
import { CreateOptionDto } from '../option-group-view/dto/create-option-dto';
import { OptionDto } from '@/types/dto/option-dto';
import { Api } from '@/core/api';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@/core/http-client';

@Injectable({
  scope: InjectionScopeEnum.Transient
})
export class OptionsApi extends Api {
  private _created = new Subject<{ id: string; name: string; description: string; value: any; type: OptionValueType; }>();
  get created() {
    return this._created.asObservable();
  }

  private _updated = new Subject<{ name: string; description: string; value: any; }>();
  get updated() {
    return this._updated.asObservable();
  }

  private _deleted = new Subject<{ id: string; }>();
  get deleted() {
    return this._deleted.asObservable();
  }

  constructor(@Inject(HttpClient) protected readonly client: HttpClient) {
    super();
  }

  create(optionGroupId: string, name: string, description: string, value: any, type: OptionValueType) {
    const r = {
      optionGroup: optionGroupId,
      name,
      description,
      value,
      type
    } as CreateOptionDto;

    this.client
      .post<OptionDto>(`options`, r)
      .pipe(catchError(e => {
        this.emitError(e);
        return EMPTY;
      }))
      .subscribe(x => {
        this._created.next(x);
      });
  }

  update(id: string, name: string, description: string, value: any, type: OptionValueType) {
    const r = { name, description, value, type } as UpdateOptionDto;
    this.client
      .put(`options/${id}`, r)
      .pipe(catchError(e => {
        this.emitError(e);
        return EMPTY;
      }))
      .subscribe(() => this._updated.next({ name, description, value }));
  }

  delete(id: string) {
    this.client.delete(`options/${id}`)
      .pipe(catchError(e => {
        this.emitError(e);
        return EMPTY;
      }))
      .subscribe(() => this._deleted.next({ id }));
  }
}
