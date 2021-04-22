import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/admin-layout/shared/services/auth.service';
import { loginError, loginPending, loginSuccess } from '../../actions/admin/account.action';
import { IJwtSetting } from '../../models/acccount/account.moduel';


@Injectable()
export class AccountEffects {
    public login$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(loginPending),
        mergeMap((request) => this.authService.login(request)
            .pipe(
                map((jwtSetting: IJwtSetting) => {
                    return loginSuccess({ jwtSetting });
                }),
                catchError(
                    (httpError) => of(loginError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) { }
}
