import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LocationService {

    constructor(private http: HttpClient, @Inject('baseUrl') private baseUrl: string) { }

    public addLocation(request): Observable<any> {
        return this.http.post(`${this.baseUrl}/location`, request);
    }

    public get(): Observable<any> {
        return this.http.get(`${this.baseUrl}/location`);
    }

}
