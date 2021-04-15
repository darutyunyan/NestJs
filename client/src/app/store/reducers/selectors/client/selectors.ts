import { createSelector } from '@ngrx/store';
import { IGetAllResponse } from 'src/app/store/models/client.model';
import { IClientState } from '../../client';

export const selectProducts = (state: IClientState) => state.clientState.products;

export const selectIdFirstProduct = createSelector(
    selectProducts,
    (state: IGetAllResponse) => {
        return state?.items[0]?.items[0]?.id;
    }
);
