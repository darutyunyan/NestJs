import { IError } from './error';

export interface IClientInitialState {
    products: IGetAllResponse;
    productById: IGetProductByIdResponse;
    feedback: IFeedbackState;
    shortFeedback: IShortFeedbackState;
    loading: boolean;
    error: IError;
}

export interface IGetAllResponse {
    items: IGetAllItem[];
    error: IError;
}

export interface IGetAllItem {
    typeName: string;
    items: INameItem[];
}

export interface INameItem {
    id: string;
    name: string;
}

export interface IGetProductByIdResponse {
    loading: boolean;
    productName: string;
    columnNames: string[];
    info: string[][];
    error: IError;
}

export interface IFeedbackState {
    feedbackSending: boolean;
    feedbackError: boolean;
}

export interface IShortFeedbackState {
    shortFeedbackSending: boolean;
    shortFeedbackError: boolean;
}
