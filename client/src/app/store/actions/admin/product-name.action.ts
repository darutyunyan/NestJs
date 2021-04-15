import { createAction, props } from '@ngrx/store';
import { IError } from '../../models/error';
import { IProductNameItem } from '../../models/produt-name/product-name.module';

export enum ProductNameActions {
    GetProductNamesPending = '[Product Name] Get product names pending',
    GetProductNamesSuccess = '[Product Name] Get product names success',
    GetProductNamesError = '[Product Name] Get product names error',

    AddProductNamePending = '[Product Name] Add product name pending',
    AddProductNameSuccess = '[Product Name] Add product name success',
    AddProductNameError = '[Product Name] Add product name error',

    RemoveProductNamePending = '[Product Name] Remove product name prending',
    RemoveProductNameSuccess = '[Product Name] Remove product Name success',
    RemoveProductNameError = '[Product Name] Remove product name error',

    ClearProductNameError = '[Product Name] Clear product name error',
}

export const getProductNamesPending = createAction(
    ProductNameActions.GetProductNamesPending
);

export const getProductNamesSuccess = createAction(
    ProductNameActions.GetProductNamesSuccess,
    props<{ items: IProductNameItem[] }>()
);

export const getProductNamesError = createAction(
    ProductNameActions.GetProductNamesError,
    props<{ error: IError }>()
);

export const addProductNamePending = createAction(
    ProductNameActions.AddProductNamePending,
    props<{ name: string, productTypeId: string }>()
);

export const addProductNameSuccess = createAction(
    ProductNameActions.AddProductNameSuccess
);

export const addProductNameError = createAction(
    ProductNameActions.AddProductNameError,
    props<{ error: IError }>()
);

export const removeProductNamePending = createAction(
    ProductNameActions.RemoveProductNamePending,
    props<{ id: string }>()
);

export const removeProductNameSuccess = createAction(
    ProductNameActions.RemoveProductNameSuccess
);

export const removeProductNameError = createAction(
    ProductNameActions.RemoveProductNameError,
    props<{ error: IError }>()
);

export const clearProductNameError = createAction(
    ProductNameActions.ClearProductNameError
);
