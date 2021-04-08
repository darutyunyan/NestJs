import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductNameModule } from './product-name/product-name.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { ColumnTypeModule } from './column-type/column-type.module';
import { ProductModule } from './product/product.module';
import { LocationModule } from './location/location.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://admin:qweqwe@cluster0.4ktpp.mongodb.net/agro-complex?retryWrites=true&w=majority'),
        ProductNameModule,
        ProductTypeModule,
        ColumnTypeModule,
        ProductModule,
        LocationModule
    ],
    controllers: [AppController]
})
export class AppModule { }
