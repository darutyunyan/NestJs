import { createAction, props } from '@ngrx/store';
import { IError } from '../../models/error';
import { ILog } from '../../models/log/log.model';

export enum LogActions {
    GetLogPending = '[Log] Get Log pending',
    GetLogSuccess = '[Log] Get Log success',
    GetLogError = '[Log] Get Log error',
    ClearLogError = '[Log] Clear log error',
}

export const getLogPending = createAction(
    LogActions.GetLogPending
);

export const getLogSuccess = createAction(
    LogActions.GetLogSuccess,
    props<{ items: ILog[] }>()
);

export const getLogError = createAction(
    LogActions.GetLogError,
    props<{ error: IError }>()
);

export const clearLogError = createAction(
    LogActions.ClearLogError
);
