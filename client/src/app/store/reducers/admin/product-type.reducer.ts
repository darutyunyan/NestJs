import { Action, createReducer, on } from '@ngrx/store';
import {
    addProductTypeError, addProductTypePending, addProductTypeSuccess,
    clearProductTypeError,
    getProductTypesError, getProductTypesPending, getProductTypesSuccess,
    removeProductTypeError, removeProductTypePending, removeProductTypeSuccess
} from '../../actions/admin/product-type.action';
import { IProductTypeState } from '../../models/product-type/product-type.model';

const initialState: IProductTypeState = {
    items: null,
    error: null,
    successOperation: false,
};

const productTypesReducer = createReducer(
    initialState,
    on(getProductTypesPending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(getProductTypesSuccess, (state, action) => {
        return {
            ...state,
            items: action.items
        };
    }),
    on(getProductTypesError, (state, action) => {
        return {
            ...state,
            items: null,
            error: action.error
        };
    }),
    on(addProductTypePending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(addProductTypeSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(addProductTypeError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(removeProductTypePending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(removeProductTypeSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(removeProductTypeError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(clearProductTypeError, (state) => {
        return {
            ...state,
            error: null
        };
    })
);

export default function reducer(state: IProductTypeState, action: Action): any {
    return productTypesReducer(state, action);
}
