import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductNameModule } from './product-name/product-name.module';
import { ProductTypeModule } from './product-type/product-type.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://admin:qweqwe@cluster0.4ktpp.mongodb.net/agro-complex?retryWrites=true&w=majority'),
        ProductNameModule,
        ProductTypeModule
    ],
    controllers: [AppController]
})
export class AppModule { }
