import { createAction, props } from '@ngrx/store';
import { IJwtSetting } from '../../models/acccount/account.moduel';
import { IError } from '../../models/error';

export enum AccountActions {
    LoginPending = '[Account] Login pending',
    LoginSuccess = '[Account] Login success',
    LoginError = '[Account] Login error',
}

export const loginPending = createAction(
    AccountActions.LoginPending,
    props<{ username: string, password: string }>()
);

export const loginSuccess = createAction(
    AccountActions.LoginSuccess,
    props<{ jwtSetting: IJwtSetting }>()
);

export const loginError = createAction(
    AccountActions.LoginError,
    props<{ error: IError }>()
);
