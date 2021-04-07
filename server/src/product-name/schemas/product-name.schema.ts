import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ProductType } from 'src/product-type/schemas/product-type.schema';

export type ProductNameDocument = ProductName & Document;

@Schema()
export class ProductName {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' })
    productType: ProductType;
}

export const ProductNameSchema = SchemaFactory.createForClass(ProductName);