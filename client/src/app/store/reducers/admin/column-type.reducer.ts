import { Action, createReducer, on } from '@ngrx/store';
import {
    addColumnTypePending, addColumnTypeSuccess, addColumnTypeError,
    removeColumnTypePending, removeColumnTypeSuccess, removeColumnTypeError,
    getColumnTypeSuccess, getColumnTypeError, clearColumnTypeError, getColumnTypePending
} from '../../actions/admin/column-type.action';
import { IColumnTypeState } from '../../models/column-type/column-type.model';

const initialState: IColumnTypeState = {
    items: null,
    error: null,
    successOperation: false,
};

const columnTypesReducer = createReducer(
    initialState,
    on(getColumnTypePending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(getColumnTypeSuccess, (state, action) => {
        return {
            ...state,
            items: action.items
        };
    }),
    on(getColumnTypeError, (state, action) => {
        return {
            ...state,
            items: null,
            error: action.error
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
