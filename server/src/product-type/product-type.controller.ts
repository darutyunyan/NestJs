import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { ProductTypeService } from './product-type.service';
import { ProductType } from './schemas/product-type.schema';

@Controller('productType')
export class ProductTypeController {
    constructor(private productTypeService: ProductTypeService) { }

    @Post()
    create(@Body() dto: CreateProductTypeDto): Promise<ProductType> {
        return this.productTypeService.create(dto);
    }

    @Get()
    getAll(): Promise<ProductType[]> {
        return this.productTypeService.getAll();
    }

    @Get('all')
    getAllProductTypes(): Promise<ProductType[]> {
        return this.productTypeService.getAllProucts();
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId): Promise<ObjectId> {
        return this.productTypeService.delete(id);
    }
}
