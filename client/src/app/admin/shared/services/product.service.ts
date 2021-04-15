import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    public addProduct(request): Observable<object> {
        return this.http.post(`/product`, request);
    }

    public updateProduct(id, request): Observable<object> {
        return this.http.put(`/product/${id}`, request);
    }

    public getAllProducts(): Observable<object> {
        return this.http.get(`/product`);
    }

    public removeProduct(id): Observable<object> {
        return this.http.delete(`/product/${id}`);
    }

    public addColumnType(request): Observable<object> {
        return this.http.post(`/columnType`, request);
    }

    public removeColumnType(id): Observable<object> {
        return this.http.delete(`/columnType/${id}`);
    }

    public getColumnTypes(): Observable<any> {
        return this.http.get(`/columnType`);
    }

    public addProductName(request): Observable<object> {
        return this.http.post(`/productName`, request);
    }

    public removeProductName(id): Observable<object> {
        return this.http.delete(`/productName/${id}`);
    }

    public getProductNames(): Observable<any> {
        return this.http.get(`/productName`);
    }

    public addProductType(request): Observable<object> {
        return this.http.post(`/productType`, request);
    }

    public removeProductType(id): Observable<object> {
        return this.http.delete(`/productType/${id}`);
    }

    public getProductTypes(): Observable<any> {
        return this.http.get(`/productType`);
    }
}
