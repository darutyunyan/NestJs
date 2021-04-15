import { Action, createReducer, on } from '@ngrx/store';
import {
    addColumnTypePending, addColumnTypeSuccess, addColumnTypeError,
    removeColumnTypePending, removeColumnTypeSuccess, removeColumnTypeError,
    getColumnTypeSuccess, getColumnTypeError, clearColumnTypeError
} from '../../actions/admin/column-type.action';
import { IColumnTypeState } from '../../models/column-type/column-type.model';

const initialState: IColumnTypeState = {
    items: [],
    error: null,
    loaded: false,
    successOperation: false,
};

const columnTypesReducer = createReducer(
    initialState,
    on(getColumnTypeSuccess, (state, action) => {
        return {
            ...state,
            items: action.items,
            loaded: true,
            successOperation: false
        };
    }),
    on(getColumnTypeError, (state, action) => {
        return {
            ...state,
            items: [],
            error: action.error,
            loaded: false
        };
    }),
    on(addColumnTypePending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(addColumnTypeSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(addColumnTypeError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(removeColumnTypePending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(removeColumnTypeSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(removeColumnTypeError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(clearColumnTypeError, (state) => {
        return {
            ...state,
            error: null
        };
    })
);

export default function reducer(state: IColumnTypeState, action: Action): any {
    return columnTypesReducer(state, action);
}
