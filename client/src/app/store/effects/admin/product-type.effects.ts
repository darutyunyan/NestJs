import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/admin-layout/shared/services/product.service';
import {
    addProductTypeError, addProductTypePending, addProductTypeSuccess,
    getProductTypesError, getProductTypesPending, getProductTypesSuccess,
    removeProductTypeSuccess, removeProductTypeError, removeProductTypePending
} from '../../actions/admin/product-type.action';
import { IProductTypeItem } from '../../models/product-type/product-type.model';

@Injectable()
export class ProductTypeEffects {
    public getProductTypes$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getProductTypesPending),
        mergeMap(() => this.productService.getProductTypes()
            .pipe(
                map((items: IProductTypeItem[]) => {
                    return getProductTypesSuccess({ items });
                }),
                catchError((httpError) =>
                    of(getProductTypesError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public addProductType$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(addProductTypePending),
        mergeMap((action) => this.productService.addProductType({ name: action.name })
            .pipe(
                map(() => {
                    return addProductTypeSuccess();
                }),
                catchError(
                    (httpError) => of(addProductTypeError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public removeProductType$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(removeProductTypePending),
        mergeMap((action) => this.productService.removeProductType(action.id)
            .pipe(
                map(() => {
                    return removeProductTypeSuccess();
                }),
                catchError((httpError) =>
                    of(removeProductTypeError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
