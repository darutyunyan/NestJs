import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { catchError, filter, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IAdminState } from 'src/app/store/reducers/admin';
import { Store } from '@ngrx/store';
import { hideLoader, showLoader } from 'src/app/store/actions/admin/loader.action';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private router: Router,
        @Inject('baseUrl') private baseUrl: string,
        private store: Store<IAdminState>
    ) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.store.dispatch(showLoader());

        if (this.auth.isAuthenicated()) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                }
            });
        }

        const mainReq = req.clone({
            url: `${this.baseUrl}${req.url}`
        });

        return next.handle(mainReq)
            .pipe(
                filter(this._isHttpResponse),
                map((res) => {
                    this.store.dispatch(hideLoader());
                    return res;
                }),
                catchError(error => {
                    if (error.status === 401) {
                        this.auth.logout();
                        this.router.navigate(['/admin', 'login']);
                    }
                    this.store.dispatch(hideLoader());
                    return throwError(error.error);
                })
            );
    }

    private _isHttpResponse(event: HttpEvent<any>): event is HttpResponse<any> {
        return event instanceof HttpResponse;
    }
}
