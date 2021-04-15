import { Action, createReducer, on } from '@ngrx/store';
import { loginError, loginSuccess } from '../../actions/admin/account.action';
import { IAccountState } from '../../models/acccount/account.moduel';

const initialState: IAccountState = {
    jwtSetting: null,
    error: null
};

const accountReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            jwtSetting: action.jwtSetting
        };
    }),
    on(loginError, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    })
);

export default function reducer(state: IAccountState, action: Action): any {
    return accountReducer(state, action);
}
