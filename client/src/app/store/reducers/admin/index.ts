import { IProductState } from '../../models/product/product.module';
import { IAccountState} from '../../models/acccount/account.moduel';
import { IProductTypeState } from '../../models/product-type/product-type.model';
import { IColumnTypeState } from '../../models/column-type/column-type.model';
import { IProductNameState } from '../../models/produt-name/product-name.module';
import { IMessageData } from '../../models/message.model';
import { ILoader } from './loader.reducer';
import { ILocationState } from '../../models/location.module';

import accountReducer from './account.reducer';
import productReducer from './product.reducers';
import productTypesReducer from './product-type.reducer';
import columnTypesReducer from './column-type.reducer';
import productNamesReducer from './product-name.reducer';
import messageReducer from '../message.reducer';
import locationReducer from '../shared/location.reducers';
import loaderReducer from '../admin/loader.reducer';



export interface IAdminState {
    adminState: IState;
}

export interface IState {
    accountState: IAccountState;
    productState: IProductState;
    productTypeState: IProductTypeState;
    columnTypeState: IColumnTypeState;
    productNameState: IProductNameState;
    locationState: ILocationState;
    messageData: IMessageData;
    loader: ILoader;
}

export const adminReducers = {
    accountState: accountReducer,
    productState: productReducer,
    productTypeState: productTypesReducer,
    columnTypeState: columnTypesReducer,
    productNameState: productNamesReducer,
    locationState: locationReducer,
    messageData: messageReducer,
    loader: loaderReducer
};

