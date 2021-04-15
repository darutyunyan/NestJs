import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/admin/shared/services/product.service';
import {
    addColumnTypePending, addColumnTypeSuccess, addColumnTypeError,
    removeColumnTypePending, removeColumnTypeSuccess, removeColumnTypeError,
    getColumnTypePending, getColumnTypeSuccess, getColumnTypeError
} from '../../actions/admin/column-type.action';
import { IColumnTypeItem } from '../../models/column-type/column-type.model';

@Injectable()
export class ColumnTypeEffects {
    public getColumnTypes$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getColumnTypePending, addColumnTypeSuccess, removeColumnTypeSuccess),
        mergeMap(() => this.productService.getColumnTypes()
            .pipe(
                map((items: IColumnTypeItem[]) => {
                    return getColumnTypeSuccess({ items });
                }),
                catchError((httpError) =>
                    of(getColumnTypeError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public addColumnType$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(addColumnTypePending),
        mergeMap((action) => this.productService.addColumnType({ name: action.name })
            .pipe(
                map(() => {
                    return addColumnTypeSuccess();
                }),
                catchError(
                    (httpError) => of(addColumnTypeError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public removeColumnType$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(removeColumnTypePending),
        mergeMap((action) => this.productService.removeColumnType(action.id)
            .pipe(
                map(() => {
                    return removeColumnTypeSuccess();
                }),
                catchError((httpError) =>
                    of(removeColumnTypeError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
