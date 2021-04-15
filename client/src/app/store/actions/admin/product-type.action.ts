import { createAction, props } from '@ngrx/store';
import { IError } from '../../models/error';
import { IProductTypeItem } from '../../models/product-type/product-type.model';

export enum ProductTypeActions {
    GetProductTypesPending = '[Product Type] Get product types pending',
    GetProductTypesSuccess = '[Product Type] Get product types success',
    GetProductTypesError = '[Product Type] Get product types error',

    AddProductTypePending = '[Product Type] Add product type pending',
    AddProductTypeSuccess = '[Product Type] Add product type success',
    AddProductTypeError = '[Product Type] Add product type error',

    RemoveProductTypePending = '[Product Type] Remove product type prending',
    RemoveProductTypeSuccess = '[Product Type] Remove product type success',
    RemoveProductTypeError = '[Product Type] Remove product type error',

    ClearProductTypeError = '[Product Type] Clear product type error',
}

export const getProductTypesPending = createAction(
    ProductTypeActions.GetProductTypesPending
);

export const getProductTypesSuccess = createAction(
    ProductTypeActions.GetProductTypesSuccess,
    props<{ items: IProductTypeItem[] }>()
);

export const getProductTypesError = createAction(
    ProductTypeActions.GetProductTypesError,
    props<{ error: IError }>()
);

export const addProductTypePending = createAction(
    ProductTypeActions.AddProductTypePending,
    props<{ name: string }>()
);

export const addProductTypeSuccess = createAction(
    ProductTypeActions.AddProductTypeSuccess
);

export const addProductTypeError = createAction(
    ProductTypeActions.AddProductTypeError,
    props<{ error: IError }>()
);

export const removeProductTypePending = createAction(
    ProductTypeActions.RemoveProductTypePending,
    props<{ id: string }>()
);

export const removeProductTypeSuccess = createAction(
    ProductTypeActions.RemoveProductTypeSuccess
);

export const removeProductTypeError = createAction(
    ProductTypeActions.RemoveProductTypeError,
    props<{ error: IError }>()
);

export const clearProductTypeError = createAction(
    ProductTypeActions.ClearProductTypeError
);
