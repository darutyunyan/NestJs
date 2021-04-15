import { Action, createReducer, on } from '@ngrx/store';
import {
    addProductError, addProductPending, addProductSuccess,
    clearProductError, getProductsError, getProductsSuccess,
    removeProductError, removeProductPending, removeProductSuccess,
    updateProductError, updateProductPending, updateProductSuccess
} from '../../actions/admin/product.action';
import { IProductState } from '../../models/product/product.module';

const initialState: IProductState = {
    items: [],
    error: null,
    loaded: false,
    successOperation: false,
};

const productReducer = createReducer(
    initialState,
    on(getProductsSuccess, (state, action) => {
        return {
            ...state,
            items: action.items,
            loaded: true,
            successOperation: false
        };
    }),
    on(getProductsError, (state, action) => {
        return {
            ...state,
            items: [],
            error: action.error,
            loaded: false
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
