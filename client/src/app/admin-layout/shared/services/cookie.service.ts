import { Injectable, isDevMode } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieOptions } from 'src/app/shared/interfaces';

@Injectable()
export class MyCookieService {

    constructor(private cookiesServ: CookieService) { }

    public set(name: string, value: string, options: CookieOptions): void {
        options.secure = isDevMode ? false : true;

        options.expires = new Date(new Date().getTime() + +options.expiresInString * 1000);

        this.cookiesServ.set(name, value, options.expires, '/', null, options.secure);
    }

    public get(name: string): string {
        return this.cookiesServ.get(name);
    }

    public check(name: string): boolean {
        return this.cookiesServ.check(name);
    }

    public delete(name: string): void {
        this.cookiesServ.delete(name, '/', null, isDevMode() ? false : true);
    }

}
