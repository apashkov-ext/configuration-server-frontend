import { Inject, Injectable } from 'di-corate';
import { UpdateOptionDto } from './dto/update-option-dto';
import { Subject } from 'rxjs';
import { HttpClient } from '@/core/http-client';

@Injectable()
export class OptionsApi {
    private _updated = new Subject<UpdateOptionDto>();
    get updated() {
        return this._updated.asObservable();
    }

    constructor(@Inject(HttpClient) private client: HttpClient) { }

    update(id: string, name: string, description: string, value: any) {
        const r = <UpdateOptionDto>{ name, description, value };
        this.client.put(`options/${id}`, r).then(() => this._updated.next(r));
    }
}