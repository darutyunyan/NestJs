import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('/product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get()
    getAll() {
        return this.productService.getAll();
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.productService.delete(id);
    }
}
