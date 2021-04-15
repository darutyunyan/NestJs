import { createAction } from '@ngrx/store';

export enum LoaderActions {
    ShowLoader = '[Loader] Show',
    HideLoader = '[Loader] Hide',
}

export const showLoader = createAction(
    LoaderActions.ShowLoader
);

export const hideLoader = createAction(
    LoaderActions.HideLoader
);
