import { ProductTypeEffects } from './product-type.effects';
import { AccountEffects } from './account.effects';
import { ColumnTypeEffects } from './column-type.effects';
import { ProductEffects } from './product.effects';
import { ProductNameEffects } from './product-name.effects';
import { LocationEffects } from '../shared/location.effects';

export const adminEffects = [
    ProductTypeEffects,
    ColumnTypeEffects,
    ProductNameEffects,
    ProductEffects,
    AccountEffects,
    LocationEffects
];
