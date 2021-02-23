import { Api } from '@/core/api';
import { HttpClient } from '@/core/http-client';
import { OptionDto } from '@/types/dto/option-dto';
import { OptionGroupDto } from '@/types/dto/option-group-dto';
import { OptionValueType } from '@/types/option-value-type.enum';
import { Inject, Injectable, InjectionScopeEnum } from 'di-corate';
import { EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateOptionGroupDto } from './dto/create-group-dto';
import { CreateOptionDto } from './dto/create-option-dto';
import { UpdateOptionGroupDto } from './dto/update-option-group-dto';

@Injectable({
  scope: InjectionScopeEnum.Transient
})
export class OptionGroupsApi extends Api {
  private _optionGroupCreated = new Subject<{ id: string; name: string; description: string; }>();
  get optionGroupCreated() {
    return this._optionGroupCreated.asObservable();
  }

  private _optionCreated = new Subject<{ id: string; name: string; description: string; value: any; type: OptionValueType; }>();
  get optionCreated() {
    return this._optionCreated.asObservable();
  }

  private _optionGroupUpdated = new Subject<{ name: string; description: string }>();
  get optionGroupUpdated() {
    return this._optionGroupUpdated.asObservable();
  }

  private _optionGroupDeleted = new Subject<{ id: string }>();
  get optionGroupDeleted() {
    return this._optionGroupDeleted.asObservable();
  }

  private _optionDeleted = new Subject<{ id: string; }>();
  get optionDeleted() {
    return this._optionDeleted.asObservable();
  }

  constructor(@Inject(HttpClient) protected readonly client: HttpClient) {
    super();
  }

  createOptionGroup(parentId: string, name: string) {
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
        this._optionGroupCreated.next({ id: x.id, name: x.name, description: '' });
      });
  }

  updateOptionGroup(id: string, name: string, description: string) {
    const r = { name, description } as UpdateOptionGroupDto;
    this.client
      .put(`option-groups/${id}`, r)
      .pipe(catchError(e => {
        this.emitError(e);
        return EMPTY;
      }))
      .subscribe(() => this._optionGroupUpdated.next(r));
  }

  deleteOptionGroup(id: string) {
    this.client
      .delete(`option-groups/${id}`)
      .pipe(catchError(e => {
        this.emitError(e);
        return EMPTY;
      }))
      .subscribe(() => this._optionGroupDeleted.next({ id }));
  }

  createOption(optionGroupId: string, name: string, description: string, value: any, type: OptionValueType) {
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
        this._optionCreated.next(x);
      });
  }

  deleteOption(id: string) {
    this.client.delete(`options/${id}`)
      .pipe(catchError(e => {
        this.emitError(e);
        return EMPTY;
      }))
      .subscribe(() => this._optionDeleted.next({ id }));
  }
}
