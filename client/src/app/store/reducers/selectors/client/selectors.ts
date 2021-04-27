import { createSelector } from '@ngrx/store';
import { IProductNameItem, ITableItem } from 'src/app/store/models/client.model';
import { IClientState } from '../../client';

export const product = (state: IClientState) => state.clientState.product;

export const selectProduct = createSelector(
    product,
    (state: IProductNameItem) => {
        if (state == null) {
            return null;
        }

        const columns = state.columnType.name.split('|');

        const values = [];
        state.products.forEach((p) => {
            values.push(p.info.split('|'));

        });

        const obj: ITableItem = {
            productName: state.name,
            columns,
            values
        };

        return obj;
    }
);
