import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { ProductType, ProductTypeDocument } from "src/product-type/schemas/product-type.schema";
import { CreateProductNameDto } from "./dto/create-product-name.dto";
import { ProductName, ProductNameDocument } from "./schemas/product-name.schema";

@Injectable()
export class ProductNameService {

    constructor(
        @InjectModel(ProductName.name) private productNameModel: Model<ProductNameDocument>,
        @InjectModel(ProductType.name) private productTypeModel: Model<ProductTypeDocument>) { }

    async create(dto: CreateProductNameDto): Promise<ProductName> {
        const productType = await this.productTypeModel.findById(dto.productTypeId);
        if (!productType) {
            throw new InternalServerErrorException();
        }
        
        // Creates a product name.
        const productName = await this.productNameModel.create({
            ...dto,
            productType: dto.productTypeId
        });

        // Adds the product name ID to the product type document.
        productType.productNames.push(productName.id);
        productType.save();

        return productName;
    }

    async getAll(): Promise<ProductName[]> {
        return await this.productNameModel
            .find()
            .populate('productType');
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const currentProductName = await this.productNameModel.findById(id);
        if (currentProductName.products.length) {
            throw new InternalServerErrorException();
        }

        // Removes the product name.
        const deletedProductName = await this.productNameModel.findByIdAndDelete(currentProductName.id);

        // Removes the product name ID from product type document.
        const productType = await this.productTypeModel.findById(deletedProductName.productType);
        const index = productType.productNames.indexOf(deletedProductName.id);
        if (index !== -1) {
            productType.productNames.splice(index, 1);
            productType.save();
        }

        return deletedProductName._id;
    }
}