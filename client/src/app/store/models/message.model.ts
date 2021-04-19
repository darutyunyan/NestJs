export enum ErrorType {
    Success = 1,
    Error
}

export interface IMessageData {
    statusCode: number;
    message?: string;
}

