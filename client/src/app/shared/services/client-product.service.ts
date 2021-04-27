import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ClientProductService {

    constructor(private http: HttpClient, @Inject('baseUrl') private baseUrl: string) { }

    public getAll(): Observable<any> {
        return this.http.get(`${this.baseUrl}/productType/all`);
    }

    public getProductById(id): Observable<any> {
        return this.http.get(`${this.baseUrl}/productName/${id}`);
    }

    public getRandomProductId(): Observable<any> {
        return this.http.get(`${this.baseUrl}/productName/getRandomProductId`, { responseType: 'text' });
    }


}
