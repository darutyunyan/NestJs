import { createAction, props } from '@ngrx/store';
import { IColumnTypeItem } from '../../models/column-type/column-type.model';
import { IError } from '../../models/error';

export enum ColumnTypeActions {
    GetColumnTypePending = '[Column Type] Get column types pending',
    GetColumnTypeSuccess = '[Column Type] Get column types success',
    GetColumnTypeError = '[Column Type] Get column types error',

    AddColumnTypePending = '[Column Type] Add column type pending',
    AddColumnTypeSuccess = '[Column Type] Add column type success',
    AddColumnTypeError = '[Column Type] Add column type error',

    RemoveColumnTypePending = '[Column Type] Remove column type prending',
    RemoveColumnTypeSuccess = '[Column Type] Remove column type success',
    RemoveColumnTypeError = '[Column Type] Remove column type error',

    ClearColumnTypeError = '[Column Type] Clear column type error',
}

export const getColumnTypePending = createAction(
    ColumnTypeActions.GetColumnTypePending
);

export const getColumnTypeSuccess = createAction(
    ColumnTypeActions.GetColumnTypeSuccess,
    props<{ items: IColumnTypeItem[] }>()
);

export const getColumnTypeError = createAction(
    ColumnTypeActions.GetColumnTypeError,
    props<{ error: IError }>()
);

export const addColumnTypePending = createAction(
    ColumnTypeActions.AddColumnTypePending,
    props<{ name: string }>()
);

export const addColumnTypeSuccess = createAction(
    ColumnTypeActions.AddColumnTypeSuccess
);

export const addColumnTypeError = createAction(
    ColumnTypeActions.AddColumnTypeError,
    props<{ error: IError }>()
);

export const removeColumnTypePending = createAction(
    ColumnTypeActions.RemoveColumnTypePending,
    props<{ id: string }>()
);

export const removeColumnTypeSuccess = createAction(
    ColumnTypeActions.RemoveColumnTypeSuccess
);

export const removeColumnTypeError = createAction(
    ColumnTypeActions.RemoveColumnTypeError,
    props<{ error: IError }>()
);

export const clearColumnTypeError = createAction(
    ColumnTypeActions.ClearColumnTypeError
);

