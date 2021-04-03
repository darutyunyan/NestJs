import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductTypeModule } from './productType/productType.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://admin:qweqwe@cluster0.4ktpp.mongodb.net/agro-complex?retryWrites=true&w=majority'),
        ProductTypeModule
    ],
    controllers: [AppController]
})
export class AppModule { }
