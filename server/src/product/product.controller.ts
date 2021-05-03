import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Post()
    create(@Body() dto: CreateProductDto): Promise<Product> {
        return this.productService.create(dto);
    }

    @Put(':id')
    update(@Body() dto: UpdateProductDto, @Param('id') id: ObjectId): Promise<Product> {
        return this.productService.update(dto, id);
    }

    @Get()
    getAll(): Promise<Product[]> {
        return this.productService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: ObjectId): Promise<Product[]> {
        return this.productService.getByProductNameId(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId): Promise<ObjectId> {
        return this.productService.delete(id);
    }
}
