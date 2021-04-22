import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { LogService } from 'src/app/admin-layout/shared/services/log.service';
import { getLogError, getLogPending, getLogSuccess } from '../../actions/admin/log.action';
import { ILog } from '../../models/log/log.model';

@Injectable()
export class LogEffects {
    public getLogs$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getLogPending),
        mergeMap(() => this.logService.getAll()
            .pipe(
                map((items: ILog[]) => {
                    return getLogSuccess({ items });
                }),
                catchError(
                    (httpError) => of(getLogError({
                        error:
                        {
                            statusCode: httpError.status,
                            message: httpError.message
                        }
                    }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private logService: LogService
    ) { }
}

