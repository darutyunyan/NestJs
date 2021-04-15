import { IClientInitialState,  } from '../../models/client.model';
import { ILocationState } from '../../models/location.module';
import clientReducer from '../client/client.reducers';
import locationReducer from '../shared/location.reducers';

export interface IClientState {
    clientState: IClientInitialState;
    locationState: ILocationState;
}

export const clientReducers = {
    clientState: clientReducer,
    locationState: locationReducer,
};
