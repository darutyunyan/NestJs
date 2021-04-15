import { IError } from '../error';

export interface IAccountState {
    jwtSetting: IJwtSetting;
    error: IError;
}

export interface IJwtSetting {
    liveTime: string;
    token: string;
}
