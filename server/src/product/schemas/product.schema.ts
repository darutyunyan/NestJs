import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ProductName } from 'src/product-name/schemas/product-name.schema';
import { ColumnType } from 'src/column-type/schemas/column-type.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({
        unique: true
    })
    info: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductName' })
    productName: ProductName;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ColumnType' })
    columnType: ColumnType;
}

export const ProductSchema = SchemaFactory.createForClass(Product);