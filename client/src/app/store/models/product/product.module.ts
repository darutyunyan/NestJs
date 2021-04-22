import { IColumnTypeItem } from '../column-type/column-type.model';
import { IProductNameItem } from '../produt-name/product-name.module';
import { IError } from '../error';

export interface IProductState  {
    items: IProductItem[];
    successOperation: boolean;
    error: IError;
}

export interface IProductItem {
    _id: string;
    info: string;
    productName: IProductNameItem;
}
