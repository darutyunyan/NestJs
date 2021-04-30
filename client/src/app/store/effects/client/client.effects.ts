import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, delay } from 'rxjs/operators';
import { ClientProductService } from 'src/app/shared/services/client-product.service';
import { ContactUsService } from 'src/app/shared/services/contact-us.service';
import {
    getProductsPending, getProductsSuccess, getProductsError,
    getProductByIdPending, getProductByIdSuccess, getProductByIdError,
    sendFeedbackPending, sendFeedbackSuccess, sendFeedbackError, sendShortFeedbackPending,
    sendShortFeedbackError, sendShortFeedbackSuccess, getRandomProductIDPending, getRandomProductIdSuccess, getRandomProductIdError
} from '../../actions/client/client.actions';
import { IProductNameItem, IProductTypeItem } from '../../models/client.model';
import { IResponseError } from '../../models/error';

@Injectable()
export class ClientEffects {
    public getProducts$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getProductsPending),
        mergeMap(() => this.productService.getAll()
            .pipe(
                delay(2000),
                map((items: IProductTypeItem[]) => {
                    return getProductsSuccess({ items });
                }),
                catchError(
                    (httpError) => of(getProductsError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public getProductById$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getProductByIdPending),
        mergeMap((action) => this.productService.getProductById(action.id)
            .pipe(
                delay(2000),
                map((item: IProductNameItem) => {
                    return getProductByIdSuccess({ item });
                }),
                catchError(
                    (httpError) => of(getProductByIdError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public getRandomProductId$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getRandomProductIDPending),
        mergeMap(() => this.productService.getRandomProductId()
            .pipe(
                delay(2000),
                map((id) => {
                    return getRandomProductIdSuccess({ id });
                }),
                catchError(
                    (httpError) => of(getRandomProductIdError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public sendFeedback$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(sendFeedbackPending),
        mergeMap((action) => this.contactUsService.sendFeedback({
            name: action.name,
            phone: action.phone,
            email: action.email,
            productPosition: action.productPosition
        })
            .pipe(
                map(() => {
                    return sendFeedbackSuccess();
                }),
                catchError(
                    (httpError) => of(sendFeedbackError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public sendShortFeedback$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(sendShortFeedbackPending),
        mergeMap((action) => this.contactUsService.sendShortFeedback({
            name: action.name,
            phone: action.phone,
            message: action.message
        })
            .pipe(
                map(() => {
                    return sendShortFeedbackSuccess();
                }),
                catchError(
                    (httpError) => of(sendShortFeedbackError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private productService: ClientProductService,
        private contactUsService: ContactUsService
    ) { }
}
