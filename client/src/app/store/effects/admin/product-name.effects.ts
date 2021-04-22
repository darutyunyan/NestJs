import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/admin-layout/shared/services/product.service';
import {
    addProductNameError, addProductNamePending, addProductNameSuccess,
    getProductNamesError, getProductNamesPending, getProductNamesSuccess,
    removeProductNameSuccess, removeProductNameError, removeProductNamePending
} from '../../actions/admin/product-name.action';
import { IProductNameItem } from '../../models/produt-name/product-name.module';

@Injectable()
export class ProductNameEffects {
    public getProductNames$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getProductNamesPending),
        mergeMap(() => this.productService.getProductNames()
            .pipe(
                map((items: IProductNameItem[]) => {
                    return getProductNamesSuccess({ items });
                }),
                catchError((httpError) =>
                    of(getProductNamesError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public addProductName$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(addProductNamePending),
        mergeMap((action) => this.productService.addProductName({
            name: action.name,
            productTypeId: action.productTypeId,
            columnTypeId: action.columnTypeId
        })
            .pipe(
                map(() => {
                    return addProductNameSuccess();
                }),
                catchError(
                    (httpError) => of(addProductNameError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public removeProductName$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(removeProductNamePending),
        mergeMap((action) => this.productService.removeProductName(action.id)
            .pipe(
                map(() => {
                    return removeProductNameSuccess();
                }),
                catchError((httpError) =>
                    of(removeProductNameError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
