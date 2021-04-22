import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LogService {

    constructor(private http: HttpClient) { }

    public getAll(): Observable<object> {
        return this.http.get(`/log`);
    }

}
