import { IError } from '../error';

export interface IProductTypeState {
    items: IProductTypeItem[];
    loaded: boolean;
    successOperation: boolean;
    error: IError;
}

export interface IProductTypeItem {
    _id: string;
    name: string;
}
