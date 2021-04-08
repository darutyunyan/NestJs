import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationSchema } from './schemas/location.schema';
import { Location } from './schemas/location.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }])],
    controllers: [LocationController],
    providers: [LocationService]
})
export class LocationModule {}
