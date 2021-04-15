import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
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
        }, { useFindAndModify: false });
    }

    async getOne(): Promise<Location> {
        const location = await this.locationModel.findOne();
        if (!location) {
            throw new NotFoundException();
        }
        return await this.locationModel.findOne();
    }

}
