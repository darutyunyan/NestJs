import { Action, createReducer, on } from '@ngrx/store';
import { addLocationError, addLocationPending, addLocationSuccess,
    getLocationError, getLocationPending, getLocationSuccess } from '../../actions/shared/location.action';
import { ILocationState } from '../../models/location.module';

const initialState: ILocationState = {
    location: {
        lat: '40.738379395637985',
        lng: '-73.76916818829386',
    },
    successOperation: false,
    loading: false,
    error: null
};

const locationReducer = createReducer(
    initialState,
    on(addLocationPending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(addLocationSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(addLocationError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(getLocationPending, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(getLocationSuccess, (state, action) => {
        return {
            ...state,
            location: {
                lat: action.location.lat,
                lng: action.location.lng
            },
            loading: false,
        };
    }),
    on(getLocationError, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false
        };
    }),
);

export default function reducer(state: ILocationState, action: Action): any {
    return locationReducer(state, action);
}
