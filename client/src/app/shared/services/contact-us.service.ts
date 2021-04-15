import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ContactUsService {

  constructor(private http: HttpClient, @Inject('baseUrl') private baseUrl: string) { }

  public sendFeedback(request): Observable<any> {
    return this.http.post(`${this.baseUrl}/contactUs/feedback`, request);
  }

  public sendShortFeedback(request): Observable<any> {
    return this.http.post(`${this.baseUrl}/contactUs/shortFeedback`, request);
  }
}
