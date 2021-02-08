import { Api } from '@/core/api';
import { OptionGroupDto } from '@/types/dto/option-group-dto';
import { Injectable } from 'di-corate';
import { Subject } from 'rxjs';
import { CreateOptionGroupDto } from './dto/create-group-dto';
import { UpdateOptionGroupDto } from './dto/update-option-group-dto';

@Injectable()
export class OptionGroupsApi extends Api {
  private _created = new Subject<{
    id: string;
    name: string;
    description: string;
  }>();
  get created() {
    return this._created.asObservable();
  }

  private _updated = new Subject<{ name: string; description: string }>();
  get updated() {
    return this._updated.asObservable();
  }

  constructor() {
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
      .then(x =>
        this._created.next({ id: x.id, name: x.name, description: '' })
      )
      .catch(e => this.emitError(e));
  }

  update(id: string, name: string, description: string) {
    const r = { name, description } as UpdateOptionGroupDto;
    this.client
      .put(`option-groups/${id}`, r)
      .then(() => this._updated.next(r))
      .catch(e => this.emitError(e));
  }
}
