import { Action, createReducer, on } from '@ngrx/store';
import {
    addProductError, addProductPending, addProductSuccess,
    clearProductError, getProductsError, getProductsPending, getProductsSuccess,
    removeProductError, removeProductPending, removeProductSuccess,
    updateProductError, updateProductPending, updateProductSuccess
} from '../../actions/admin/product.action';
import { IProductState } from '../../models/product/product.module';

const initialState: IProductState = {
    items: null,
    error: null,
    successOperation: false,
};

const productReducer = createReducer(
    initialState,
    on(getProductsPending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(getProductsSuccess, (state, action) => {
        return {
            ...state,
            items: action.items
        };
    }),
    on(getProductsError, (state, action) => {
        return {
            ...state,
            items: [],
            error: action.error
        };
    }),
    on(addProductPending, updateProductPending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(addProductSuccess, updateProductSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(addProductError, updateProductError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(removeProductPending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(removeProductSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(removeProductError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(clearProductError, (state) => {
        return {
            ...state,
            error: null
        };
    })
);

export default function reducer(state: IProductState, action: Action): any {
    return productReducer(state, action);
}
