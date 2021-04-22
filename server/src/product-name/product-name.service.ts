import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { ColumnType, ColumnTypeDocument } from "src/column-type/schemas/column-type.schema";
import { ProductType, ProductTypeDocument } from "src/product-type/schemas/product-type.schema";
import { BusinessException } from "src/shared/exeptions/business.exception";
import { CreateProductNameDto } from "./dto/create-product-name.dto";
import { ProductName, ProductNameDocument } from "./schemas/product-name.schema";

@Injectable()
export class ProductNameService {

    constructor(
        @InjectModel(ProductName.name) private productNameModel: Model<ProductNameDocument>,
        @InjectModel(ProductType.name) private productTypeModel: Model<ProductTypeDocument>,
        @InjectModel(ColumnType.name) private columnTypeModel: Model<ColumnTypeDocument>,
        private configService: ConfigService) { }

    async create(dto: CreateProductNameDto): Promise<ProductName> {
        const productType = await this.productTypeModel.findById(dto.productTypeId);
        const columnType = await this.columnTypeModel.findById(dto.columnTypeId);
        if (!productType || !columnType) {
            throw new InternalServerErrorException();
        }

        // Creates a product name.
        const productName = await this.productNameModel.create({
            ...dto,
            productType: dto.productTypeId,
            columnType: dto.columnTypeId
        });

        // Adds the product name ID to the product type document.
        productType.productNames.push(productName.id);
        productType.save();

        // Adds the product ID to the column type document.
        columnType.productNames.push(productName.id);
        columnType.save();

        return productName;
    }

    async getAll(): Promise<ProductName[]> {
        return await this.productNameModel
            .find()
            .populate('productType')
            .populate('columnType');
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const products = await (await this.productNameModel.findById(id)).products;
        if (products.length) {
            throw new BusinessException(this.configService.get('PRODUCT_NAME_DELETE_MESSAGE'));
        }

        // Removes the product name.
        const deletedProductName = await this.productNameModel.findByIdAndDelete(id);

        // Removes the product name ID from product type document.
        const productType = await this.productTypeModel.findById(deletedProductName.productType);
        const productNameIndex = productType.productNames.indexOf(deletedProductName.id);
        if (productNameIndex !== -1) {
            productType.productNames.splice(productNameIndex, 1);
            productType.save();
        }

        // Removes the product name ID from  column type document.
        const columnType = await this.columnTypeModel.findById(deletedProductName.columnType);
        const columnTypeIndex = columnType.productNames.indexOf(deletedProductName.id);
        if (columnTypeIndex !== -1) {
            columnType.productNames.splice(columnTypeIndex, 1);
            columnType.save();
        }

        return deletedProductName._id;
    }
}