import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location, LocationDocument } from './schemas/location.schema';

@Injectable()
export class LocationService {

    constructor(@InjectModel(Location.name) private locationModel: Model<LocationDocument>) { }

    async create(dto: CreateLocationDto): Promise<Location> {
        const currentLocation = await this.locationModel.findOne();

        if (currentLocation == null) {
            const location = await this.locationModel.create({ ...dto });
            return location;
        } else {
            const location = await this.locationModel.findByIdAndUpdate(currentLocation.id, {
                lat: dto.lat,
                lng: dto.lng
            });
            return location;
        }
    }

    async update(dto: UpdateLocationDto): Promise<Location> {
        const location = await this.locationModel.findByIdAndUpdate(dto.id, dto);
        return location;
    }

    async getOne(): Promise<Location> {
        const location = await this.locationModel.findOne();
        return location;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const location = await this.locationModel.findByIdAndDelete(id);
        return location._id;
    }
}
