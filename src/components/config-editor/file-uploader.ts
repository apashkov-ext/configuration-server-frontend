import { Api } from '@/core/api';
import { HttpClient } from '@/core/http-client';
import { Inject, Injectable, InjectionScopeEnum } from 'di-corate';
import { EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    scope: InjectionScopeEnum.Transient
})
export class FileUploader extends Api {
    private _uploaded = new Subject<void>();
    get uploaded() {
        return this._uploaded.asObservable();
    }

    constructor(@Inject(HttpClient) private readonly http: HttpClient) {
        super();
    }

    upload(file: File, projectId: string, envName: string) {
        const formData = new FormData();
        formData.append('file', file);

        this.http.post(`configurations?projId=${projectId}&envName=${envName}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .pipe(catchError(e => {
                this.emitError(e);
                return EMPTY;
            }))
            .subscribe(() => this._uploaded.next());
    }
}