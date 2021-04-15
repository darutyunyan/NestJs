import { createAction, props } from '@ngrx/store';
import { IGetAllResponse, IGetProductByIdResponse } from '../../models/client.model';
import { IError } from '../../models/error';

export enum ClientActions {
    GetProductsPending = '[Product] Get products pending',
    GetProductsSuccess = '[Product] Get products success',
    GetProductsError = '[Product] Get products error',

    GetProductByIdPending = '[Product] Get product by id pending',
    GetProductByIdSuccess = '[Product] Get product by id success',
    GetProductByIdError = '[Product] Get product by id error',

    SendFeedbackPending = '[Feedback] Send feedback pending',
    SendFeedbackSuccess = '[Feedback] Send feedback success',
    SendFeedbackError = '[Feedback] Send feedback error',

    SendShortFeedbackPending = '[Short feedback] Send short feedback pending',
    SendShortFeedbackSuccess = '[Short feedback] Send short feedback success',
    SendShortFeedbackError = '[Short feedback] Send short feedback error',

    ClearProductError = '[Product] Clear product error',
}

export const getProductsPending = createAction(
    ClientActions.GetProductsPending
);

export const getProductsSuccess = createAction(
    ClientActions.GetProductsSuccess,
    props<{ response: IGetAllResponse }>()
);

export const getProductsError = createAction(
    ClientActions.GetProductsError,
    props<{ error: IError }>()
);

export const getProductByIdPending = createAction(
    ClientActions.GetProductByIdPending,
    props<{ id: string }>()
);

export const getProductByIdSuccess = createAction(
    ClientActions.GetProductByIdSuccess,
    props<{ response: IGetProductByIdResponse }>()
);

export const getProductByIdError = createAction(
    ClientActions.GetProductByIdError,
    props<{ error: IError }>()
);

export const sendFeedbackPending = createAction(
    ClientActions.SendFeedbackPending,
    props<{ name: string, phone: string, email: string, productPosition: string }>()
);

export const sendFeedbackSuccess = createAction(
    ClientActions.SendFeedbackSuccess
);

export const sendFeedbackError = createAction(
    ClientActions.SendFeedbackError,
    props<{ error: IError }>()
);

export const sendShortFeedbackPending = createAction(
    ClientActions.SendShortFeedbackPending,
    props<{ name: string, phone: string, message: string }>()
);

export const sendShortFeedbackSuccess = createAction(
    ClientActions.SendShortFeedbackSuccess
);

export const sendShortFeedbackError = createAction(
    ClientActions.SendShortFeedbackError,
    props<{ error: IError }>()
);

export const clearProductError = createAction(
    ClientActions.ClearProductError
);
