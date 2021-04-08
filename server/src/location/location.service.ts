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
        const location = await this.locationModel.findOne();

        if (location == null) {
            return await this.locationModel.create({ ...dto });
        } 

        return await this.locationModel.findByIdAndUpdate(location.id, {
            lat: dto.lat,
            lng: dto.lng
        });
    }

    async update(dto: UpdateLocationDto): Promise<Location> {
        return await this.locationModel.findByIdAndUpdate(dto.id, dto);
    }

    async getOne(): Promise<Location> {
        return await this.locationModel.findOne();
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const location = await this.locationModel.findByIdAndDelete(id);
        return location._id;
    }
}
