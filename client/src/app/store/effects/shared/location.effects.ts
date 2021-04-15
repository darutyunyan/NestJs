import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { LocationService } from 'src/app/shared/services/location.service';
import {
    addLocationError, addLocationPending, addLocationSuccess,
    getLocationError, getLocationPending, getLocationSuccess
} from '../../actions/shared/location.action';
import { ILocation } from '../../models/location.module';

@Injectable()
export class LocationEffects {
    public addLocation: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(addLocationPending),
        mergeMap((action) => this.locationService.addLocation({ lat: action.lat, lng: action.lng })
            .pipe(map(() => {
                return addLocationSuccess();
            }),
                catchError(
                    (httpError) => of(addLocationError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public getLocation$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getLocationPending, addLocationSuccess),
        mergeMap(() => this.locationService.get()
            .pipe(
                map((location: ILocation) => {
                    return getLocationSuccess({ location });
                }),
                catchError(
                    (httpError) => of(getLocationError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private locationService: LocationService
    ) { }
}

