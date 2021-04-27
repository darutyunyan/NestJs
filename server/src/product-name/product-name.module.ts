
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ColumnType, ColumnTypeSchema } from "src/column-type/schemas/column-type.schema";
import { ProductType, ProductTypeSchema } from "src/product-type/schemas/product-type.schema";
import { ProductNameController } from "./product-name.controller";
import { ProductNameService } from "./product-name.service";
import { ProductName, ProductNameSchema } from "./schemas/product-name.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ProductName.name, schema: ProductNameSchema },
            { name: ProductType.name, schema: ProductTypeSchema },
            { name: ColumnType.name, schema: ColumnTypeSchema }
        ])
    ],
    controllers: [ProductNameController],
    providers: [ProductNameService]

})
export class ProductNameModule { }

