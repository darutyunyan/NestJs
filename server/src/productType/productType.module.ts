
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductTypeController } from "./productType.controller";
import { ProductTypeService } from "./productType.service";
import { ProductType, ProductTypeSchema } from "./schemas/productType.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: ProductType.name, schema: ProductTypeSchema }])],
    controllers: [ProductTypeController],
    providers: [ProductTypeService]

})
export class ProductTypeModule { }

