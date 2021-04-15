export interface IResponseError {
    error: IError;
}

export interface IError {
    statusCode: string;
    message: string;
}
