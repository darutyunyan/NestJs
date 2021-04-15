import { IError } from './error';

export interface ILocationState {
    location: ILocation;
    loading: boolean;
    successOperation: boolean;
    error: IError;
}

export interface ILocation{
    lat: string;
    lng: string;
}
