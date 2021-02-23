import { Api } from '@/core/api';
import { HttpClient } from '@/core/http-client';
import { OptionGroupDto } from '@/types/dto/option-group-dto';
import { Inject, Injectable, InjectionScopeEnum } from 'di-corate';
import { EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    scope: InjectionScopeEnum.Transient
})
export class ConfigEditorApi extends Api {
    private _optionGroupLoaded = new Subject<OptionGroupDto>();
    get optionGroupLoaded() {
        return this._optionGroupLoaded.asObservable();
    }

    constructor(@Inject(HttpClient) private readonly http: HttpClient) {
        super();
    }

    getOptionGroup(id: string) {
        this.http.get<OptionGroupDto>(`option-groups/${id}`)
            .pipe(catchError(e => {
                this.emitError(e);
                return EMPTY;
            }))
            .subscribe(x => this._optionGroupLoaded.next(x));
    }
}