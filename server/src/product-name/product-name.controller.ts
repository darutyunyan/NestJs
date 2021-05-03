import { Body, Controller,  Delete,  Get,  Param,  Post, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateProductNameDto } from './dto/create-product-name.dto';
import { ProductNameService } from './product-name.service';
import { ProductName } from './schemas/product-name.schema';

@Controller('productName')
export class ProductNameController {
    constructor(private productNameService: ProductNameService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateProductNameDto): Promise<ProductName> {
        return this.productNameService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: ObjectId): Promise<ObjectId>  {
        return this.productNameService.delete(id);
    }
}
