import { HttpClient } from '@/core/http-client';
import { OptionGroupDto } from '@/types/dto/option-group-dto';
import { Inject, Injectable } from 'di-corate';
import { Subject } from 'rxjs';
import { CreateOptionGroupDto } from './dto/create-group-dto';
import { UpdateOptionGroupDto } from './dto/update-option-group-dto';

@Injectable()
export class OptionGroupsApi {
    private _created = new Subject<{id: string, name: string, description: string}>();
    get created() {
        return this._created.asObservable();
    }

    private _updated = new Subject<{name: string, description: string}>();
    get updated() {
        return this._updated.asObservable();
    }

    constructor(@Inject(HttpClient) private client: HttpClient) { }

    create(parentId: string, name: string) {
        const r = <CreateOptionGroupDto>{ parent: parentId, name, description: '' };
        this.client.post<OptionGroupDto>(`option-groups`, r).then(x => this._created.next({ id: x.id, name: x.name, description: '' }));
    }

    update(id: string, name: string, description: string) {
        const r = <UpdateOptionGroupDto>{ name, description };
        this.client.put(`option-groups`, r).then(() => this._updated.next({ name, description }));
    }
}