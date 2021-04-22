import { IColumnTypeItem } from '../column-type/column-type.model';
import { IError } from '../error';
import { IProductTypeItem } from '../product-type/product-type.model';

export interface IProductNameState {
    items: IProductNameItem[];
    successOperation: boolean;
    error: IError;
}

export interface IProductNameItem {
    _id: string;
    name: string;
    productType: IProductTypeItem;
    columnType: IColumnTypeItem;
}
