export interface CookieOptions {
    expiresInString?: string;
    expires?: Date;
    'max-age'?: string;
    secure?: boolean;
    path?: string;
    'SameSite'?: string;
}

export interface Item {
    id: string;
    name: string;
}

export interface Product {
    productName?: string;
    columnNames?: string[];
    info?: string[][];
    serviceError: any;
}
