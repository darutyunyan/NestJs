import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ClientProductService {

  constructor(private http: HttpClient, @Inject('baseUrl') private baseUrl: string) { }

  public getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/getAll`);
  }

  public getProductById(request): Observable<any> {
    return this.http.post(`${this.baseUrl}/product/getProductById`, request);
  }

}
