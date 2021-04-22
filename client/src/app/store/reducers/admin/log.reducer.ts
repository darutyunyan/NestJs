import { Action, createReducer, on } from '@ngrx/store';
import { clearLogError, getLogError, getLogSuccess } from '../../actions/admin/log.action';
import { ILogState } from '../../models/log/log.model';

const initialState: ILogState = {
    items: null,
    error: null
};

const logReducer = createReducer(
    initialState,
    on(getLogSuccess, (state, action) => {
        return {
            ...state,
            items: action.items
        };
    }),
    on(getLogError, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(clearLogError, (state) => {
        return {
            ...state,
            error: null
        };
    })
);

export default function reducer(state: ILogState, action: Action): any {
    return logReducer(state, action);
}
