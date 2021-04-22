import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema()
export class Log {
    @Prop()
    dateCreation: Date;

    @Prop()
    path: string;

    @Prop()
    message: string;

    @Prop()
    stackTrace: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);