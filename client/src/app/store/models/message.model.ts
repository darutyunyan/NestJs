export enum ErrorType {
    Success = 1,
    Error,
    Warning,
    Info,
}

export interface IMessageData {
    statusCode: string;
    message?: string;
}

