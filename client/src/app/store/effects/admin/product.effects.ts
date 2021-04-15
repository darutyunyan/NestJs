import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/admin/shared/services/product.service';
import {
    updateProductError, updateProductPending, updateProductSuccess, getProductsError,
    getProductsPending, getProductsSuccess, removeProductError, removeProductPending,
    removeProductSuccess,
    addProductPending,
    addProductSuccess,
    addProductError
} from '../../actions/admin/product.action';
import { IProductItem } from '../../models/product/product.module';


@Injectable()
export class ProductEffects {
    public getProducts$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getProductsPending, removeProductSuccess, updateProductSuccess),
        mergeMap(() => this.productService.getAllProducts()
            .pipe(
                map((items: IProductItem[]) => {
                    return getProductsSuccess({ items });
                }),
                catchError(
                    (httpError) => of(getProductsError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public addProduct$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(addProductPending),
        mergeMap((action) => this.productService.addProduct({
            info: action.info,
            productNameId: action.productNameId,
            columnTypeId: action.columnTypeId
        })
            .pipe(
                map(() => {
                    return addProductSuccess();
                }),
                catchError(
                    (httpError) => of(addProductError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public updateProduct$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(updateProductPending),
        mergeMap((action) => this.productService.updateProduct(action.id,
            {
                info: action.info,
                productNameId: action.productNameId,
                columnTypeId: action.columnTypeId
            })
            .pipe(
                map(() => {
                    return updateProductSuccess();
                }),
                catchError(
                    (httpError) => of(updateProductError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public removeProduct$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(removeProductPending),
        mergeMap((action) => this.productService.removeProduct(action.id)
            .pipe(
                map(() => {
                    return removeProductSuccess();
                }),
                catchError((httpError) =>
                    of(removeProductError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
