import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { ProductTypeService } from './product-type.service';

@Controller('/productType')
export class ProductTypeController {

    constructor(private productTypeService: ProductTypeService) { }

    @Post()
    create(@Body() dto: CreateProductTypeDto) {
        return this.productTypeService.create(dto);
    }

    @Get()
    getAll() {
        return this.productTypeService.getAll();
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.productTypeService.delete(id);
    }
}
