import { IError } from '../error';

export interface ILogState {
    items: ILog[];
    error: IError;
}

export interface ILog {
    _id: string;
    dateCreation: string;
    path: string;
    message: string;
    stackTrace: string;
}
