import { Inject, Injectable } from 'di-corate';
import { UpdateOptionDto } from './dto/update-option-dto';
import { Subject } from 'rxjs';
import { HttpClient } from '@/core/http-client';
import { OptionValueType } from '@/types/option-value-type.enum';
import { CreateOptionDto } from '../option-group-view/dto/create-option-dto';
import { OptionDto } from '@/types/dto/option-dto';

@Injectable()
export class OptionsApi {
    private _created = new Subject<{ id: string, name: string, description: string, value: any, type: OptionValueType }>();
    get created() {
        return this._created.asObservable();
    }

    private _updated = new Subject<{ name: string, description: string, value: any }>();
    get updated() {
        return this._updated.asObservable();
    }

    constructor(@Inject(HttpClient) private client: HttpClient) { }

    create(optionGroupId: string, name: string, description: string, value: any, type: OptionValueType) {
        const r = <CreateOptionDto>{ optionGroup: optionGroupId, name, description, value, type };
        this.client.post<OptionDto>(`options`, r).then(x => this._created.next(x));
    }

    update(id: string, name: string, description: string, value: any, type: OptionValueType) {
        const r = <UpdateOptionDto>{ name, description, value, type };
        this.client.put(`options/${id}`, r).then(() => this._updated.next({ name, description, value }));
    }
}