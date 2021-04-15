import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationService } from './location.service';
import { Location } from './schemas/location.schema';

@Controller('location')
export class LocationController {
    constructor(private locationService: LocationService) { }

    @Post()
    create(@Body() dto: CreateLocationDto): Promise<Location> {
        return this.locationService.create(dto);
    }

    @Get()
    get(): Promise<Location> {
        return this.locationService.getOne();
    }

}
