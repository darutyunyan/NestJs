import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ColumnTypeDocument = ColumnType & Document;

@Schema()
export class ColumnType {
    @Prop()
    name: string;
}

export const ColumnTypeSchema = SchemaFactory.createForClass(ColumnType);