import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductNameModule } from './product-name/product-name.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { ColumnTypeModule } from './column-type/column-type.module';
import { ProductModule } from './product/product.module';
import { LocationModule } from './location/location.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactModule } from './contact-us/contact-us.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/http-exceptions.filter';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                uri: config.get('CONNECTION_STRING'),
                useCreateIndex: true
            }),
            inject: [ConfigService]
        }),
        ProductNameModule,
        ProductTypeModule,
        ColumnTypeModule,
        ProductModule,
        LocationModule,
        ContactModule,
        AuthModule
    ],
    providers: [
        {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
        },
      ],
    controllers: [AppController]
})
export class AppModule { }
