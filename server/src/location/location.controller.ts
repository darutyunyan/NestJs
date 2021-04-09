import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationService } from './location.service';
import { Location } from './schemas/location.schema';

@Controller('/Location')
export class LocationController {
    constructor(private locationService: LocationService) { }

    @Post()
    create(@Body() dto: CreateLocationDto): Promise<Location> {
        return this.locationService.create(dto);
    }

    @Put()
    update(@Body() dto: UpdateLocationDto): Promise<Location> {
        return this.locationService.update(dto);
    }

    @Get()
    get(): Promise<Location> {
        return this.locationService.getOne();
    }
    
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.locationService.delete(id);
    }
}
