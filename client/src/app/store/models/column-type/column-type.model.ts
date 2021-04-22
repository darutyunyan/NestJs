import { IError } from '../error';

export interface IColumnTypeState {
    items: IColumnTypeItem[];
    successOperation: boolean;
    error: IError;
}

export interface IColumnTypeItem {
    _id: string;
    name: string;
}
