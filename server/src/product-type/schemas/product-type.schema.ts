import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ProductName } from 'src/product-name/schemas/product-name.schema';

export type ProductTypeDocument = ProductType & Document;

@Schema()
export class ProductType {
    @Prop({
        unique: true
    })
    name: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductName' }])
    productNames: ProductName[];
}

export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);