import { Body, Controller,  Delete,  Get,  Param,  Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateProductNameDto } from './dto/create-product-name.dto';
import { ProductNameService } from './product-name.service';
import { ProductName } from './schemas/product-name.schema';

@Controller('productName')
export class ProductNameController {
    constructor(private productNameService: ProductNameService) { }

    @Post()
    create(@Body() dto: CreateProductNameDto): Promise<ProductName> {
        return this.productNameService.create(dto);
    }

    @Get()
    getAll(): Promise<ProductName[]> {
        return this.productNameService.getAll();
    }
    
    @Get('getRandomProductId')
    getRandomProductIndex(): Promise<string> {
        return this.productNameService.getRandomId();
    }

    @Get(':id')
    getById(@Param('id') id: ObjectId): Promise<ProductName> {
        return this.productNameService.getById(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId): Promise<ObjectId>  {
        return this.productNameService.delete(id);
    }
}
