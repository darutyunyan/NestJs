import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductName, ProductNameSchema } from 'src/product-name/schemas/product-name.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Product.name, schema: ProductSchema },
        { name: ProductName.name, schema: ProductNameSchema }
    ])],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule { }
