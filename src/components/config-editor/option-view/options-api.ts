import { Inject, Injectable } from 'di-corate';
import { UpdateOptionDto } from './dto/update-option-dto';
import { Subject } from 'rxjs';
import { HttpClient } from '@/core/http-client';
import { OptionValueType } from '@/types/option-value-type.enum';

@Injectable()
export class OptionsApi {
    private _updated = new Subject<UpdateOptionDto>();
    get updated() {
        return this._updated.asObservable();
    }

    constructor(@Inject(HttpClient) private client: HttpClient) { }

    update(id: string, name: string, description: string, value: any, type: OptionValueType) {
        const r = <UpdateOptionDto>{ name, description, value, type };
        this.client.put(`options/${id}`, r).then(() => this._updated.next(r));
    }

    private serialize(value: any, type: OptionValueType): string {
        switch (type) {
            case OptionValueType.String:
            case OptionValueType.Boolean:
            case OptionValueType.Number: return value as string;
            case OptionValueType.StringArray: 
            case OptionValueType.NumberArray: return this.reduceArray(value as any[]);
        }
    }

    private reduceArray(arr: any[]): string {
        return arr.join(',');
    }
}