import { createAction, props } from '@ngrx/store';
import { IError } from '../../models/error';
import { ILocation } from '../../models/location.module';

export enum LocationActions {
    AddLocationPending = '[Location] Add location pending',
    AddLocationSuccess = '[Location] Add location success',
    AddLocationError = '[Location] Add location error',

    GetLocationPending = '[Location] Get location pending',
    GetLocationSuccess = '[Location] Get location success',
    GetLocationError = '[Location] Get location error',

}

export const addLocationPending = createAction(
    LocationActions.AddLocationPending,
    props<{ lat: string, lng: string }>()
);

export const addLocationSuccess = createAction(
    LocationActions.AddLocationSuccess
);

export const addLocationError = createAction(
    LocationActions.AddLocationError,
    props<{ error: IError }>()
);

export const getLocationPending = createAction(
    LocationActions.GetLocationPending
);

export const getLocationSuccess = createAction(
    LocationActions.GetLocationSuccess,
    props<{ location: ILocation }>()
);

export const getLocationError = createAction(
    LocationActions.GetLocationError,
    props<{ error: IError }>()
);
