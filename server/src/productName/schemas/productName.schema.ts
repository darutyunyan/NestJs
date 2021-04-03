import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ProductNameDocument = ProductName & Document;

@Schema()
export class ProductName {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' })
    productType: mongoose.ObjectId;
}

export const ProductNameSchema = SchemaFactory.createForClass(ProductName);