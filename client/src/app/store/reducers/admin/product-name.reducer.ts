import { Action, createReducer, on } from '@ngrx/store';
import {
    addProductNameError, addProductNamePending, addProductNameSuccess,
    getProductNamesError, getProductNamesSuccess,
    removeProductNameSuccess, removeProductNameError, removeProductNamePending, clearProductNameError, getProductNamesPending
} from '../../actions/admin/product-name.action';
import { IProductNameState } from '../../models/produt-name/product-name.module';

const initialState: IProductNameState = {
    items: [],
    error: null,
    loaded: false,
    successOperation: false,
};

const productNamesReducer = createReducer(
    initialState,
    on(getProductNamesSuccess, (state, action) => {
        return {
            ...state,
            items: action.items,
            loaded: true,
            successOperation: false
        };
    }),
    on(getProductNamesError, (state, action) => {
        return {
            ...state,
            items: [],
            error: action.error,
            loaded: false
        };
    }),
    on(addProductNamePending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(addProductNameSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(addProductNameError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(removeProductNamePending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(removeProductNameSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(removeProductNameError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(clearProductNameError, (state) => {
        return {
            ...state,
            error: null
        };
    })
);

export default function reducer(state: IProductNameState, action: Action): any {
    return productNamesReducer(state, action);
}
