import { IError } from './error';
import { IFeedbackState, IShortFeedbackState } from './feedback/feedback.module';

export interface IClientInitialState {
    products: IProductTypeItem[];
    productsLoading: boolean;

    product: IProductNameItem;
    productLoading: boolean;

    randonProductId: string;

    feedback: IFeedbackState;
    shortFeedback: IShortFeedbackState;

    error: IError;
}

export interface IProductTypeItem {
    _id: string;
    name: string;
    productNames: IProductNameItem[];
}

export interface IProductNameItem {
    _id: string;
    name: string;
    products: string[] | IProductItem[];
    columnType?: IColumnTypeItem;
}

export interface IColumnTypeItem {
    name: string;
}

export interface IProductItem {
    info: string;
}

export interface ITableItem {
    productName: string;
    columns: string[];
    values: string[][];
}
