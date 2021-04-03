import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductNameModule } from './productName/productName.module';
import { ProductTypeModule } from './productType/productType.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://admin:qweqwe@cluster0.4ktpp.mongodb.net/agro-complex?retryWrites=true&w=majority'),
        ProductNameModule,
        ProductTypeModule
    ],
    controllers: [AppController]
})
export class AppModule { }
