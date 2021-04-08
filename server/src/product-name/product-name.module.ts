
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductType, ProductTypeSchema } from "src/product-type/schemas/product-type.schema";
import { ProductNameController } from "./product-name.controller";
import { ProductNameService } from "./product-name.service";
import { ProductName, ProductNameSchema } from "./schemas/product-name.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ProductType.name, schema: ProductTypeSchema },
            { name: ProductName.name, schema: ProductNameSchema }
        ]),
    ],
    controllers: [ProductNameController],
    providers: [ProductNameService]

})
export class ProductNameModule { }

