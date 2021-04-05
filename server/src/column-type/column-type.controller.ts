import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ColumnTypeService } from './column-type.service';
import { CreateColumnTypeDto } from './dto/create-column-type.dto';

@Controller('/columnType')
export class ColumnTypeController {

    constructor(private columnTypeService: ColumnTypeService) { }

    @Post()
    create(@Body() dto: CreateColumnTypeDto) {
        return this.columnTypeService.create(dto);
    }

    @Get()
    getAll() {
        return this.columnTypeService.getAll();
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.columnTypeService.delete(id);
    }
}
