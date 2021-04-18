import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';

export type ColumnTypeDocument = ColumnType & Document;

@Schema()
export class ColumnType {
    @Prop()
    name: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }])
    products: Product[];
}

export const ColumnTypeSchema = SchemaFactory.createForClass(ColumnType);