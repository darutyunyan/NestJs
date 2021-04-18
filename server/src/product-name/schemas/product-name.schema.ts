import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ProductType } from 'src/product-type/schemas/product-type.schema';
import { Product } from 'src/product/schemas/product.schema';

export type ProductNameDocument = ProductName & Document;

@Schema()
export class ProductName {
    @Prop({
        unique: true
    })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' })
    productType: ProductType;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }])
    products: Product[];
}

export const ProductNameSchema = SchemaFactory.createForClass(ProductName);