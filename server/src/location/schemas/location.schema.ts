import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location {
    @Prop()
    lat: string;

    @Prop()
    lng: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);