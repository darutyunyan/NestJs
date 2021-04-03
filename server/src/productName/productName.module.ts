
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductType, ProductTypeSchema } from "src/productType/schemas/productType.schema";
import { ProductNameController } from "./productName.controller";
import { ProductNameService } from "./productName.service";
import { ProductName, ProductNameSchema } from "./schemas/productName.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ProductType.name, schema: ProductTypeSchema }]),
        MongooseModule.forFeature([{ name: ProductName.name, schema: ProductNameSchema }])
    ],
    controllers: [ProductNameController],
    providers: [ProductNameService]

})
export class ProductNameModule { }

