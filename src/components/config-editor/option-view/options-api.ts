import { Inject, Injectable, InjectionScopeEnum } from 'di-corate';
import { EMPTY, Subject } from 'rxjs';
import { OptionValueType } from '@/domain/option-value-type.enum';
import { Api } from '@/core/api';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@/core/http-client';
import { CreateOptionDto, OptionDto, UpdateOptionDto } from '@/types/dto';

@Injectable({
  scope: InjectionScopeEnum.Transient
})
export class OptionsApi extends Api {
  private _updated = new Subject<{ name: string; description: string; value: any; }>();
  get updated() {
    return this._updated.asObservable();
  }

  private _created = new Subject<OptionDto>();
  get created() {
    return this._created.asObservable();
  }

  private _optionDeleted = new Subject<{ id: string; }>();
  get optionDeleted() {
    return this._optionDeleted.asObservable();
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

  delete(id: string) {
    this.client.delete(`options/${id}`)
      .pipe(catchError(e => {
        this.emitError(e);
        return EMPTY;
      }))
      .subscribe(() => this._optionDeleted.next({ id }));
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
}
