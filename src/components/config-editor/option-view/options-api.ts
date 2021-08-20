import { Inject, Injectable, InjectionScopeEnum } from 'di-corate';
import { UpdateOptionDto } from './dto/update-option-dto';
import { EMPTY, Subject } from 'rxjs';
import { OptionValueType } from '@/domain/option-value-type.enum';
import { Api } from '@/core/api';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@/core/http-client';

@Injectable({
  scope: InjectionScopeEnum.Transient
})
export class OptionsApi extends Api {
  private _updated = new Subject<{ name: string; description: string; value: any; }>();
  get updated() {
    return this._updated.asObservable();
  }

  constructor(@Inject(HttpClient) protected readonly client: HttpClient) {
    super();
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
