import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductTypeDocument = ProductType & Document;

@Schema()
export class ProductType {
    @Prop()
    name: string;
} 

export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);