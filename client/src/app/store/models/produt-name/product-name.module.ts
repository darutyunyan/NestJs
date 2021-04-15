import { IError } from '../error';
import { IProductTypeItem } from '../product-type/product-type.model';

export interface IProductNameState {
    items: IProductNameItem[];
    loaded: boolean;
    successOperation: boolean;
    error: IError;
}

export interface IProductNameItem {
    _id: string;
    name: string;
    productType: IProductTypeItem;
}
