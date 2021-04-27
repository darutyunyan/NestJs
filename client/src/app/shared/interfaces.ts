export interface CookieOptions {
    expiresInString?: string;
    expires?: Date;
    'max-age'?: string;
    secure?: boolean;
    path?: string;
    'SameSite'?: string;
}
