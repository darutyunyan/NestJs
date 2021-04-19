export interface IResponseError {
    error: IError;
}

export interface IError {
    statusCode: number;
    message: string;
}
