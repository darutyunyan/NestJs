import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { ProductType, ProductTypeDocument } from "src/product-type/schemas/product-type.schema";
import { CreateProductNameDto } from "./dto/create-product-name.dto";
import { ProductName, ProductNameDocument } from "./schemas/product-name.schema";

@Injectable()
export class ProductNameService {

    constructor(
        @InjectModel(ProductType.name) private productTypeModel: Model<ProductTypeDocument>,
        @InjectModel(ProductName.name) private productNameModel: Model<ProductNameDocument>) { }

    async create(dto: CreateProductNameDto): Promise<ProductName> {
        const productType = await this.productTypeModel.findById(dto.productTypeId);
        const productName = await this.productNameModel.create({
            name: dto.name,
            productType: productType._id
        });

        productType.productNames.push(productName);
        await productType.save();

        return productName;
    }

    async getAll(): Promise<ProductName[]> {
        const productNames = await this.productNameModel.find().populate('productType');
        return productNames;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const productName = await this.productNameModel.findByIdAndDelete(id);
        return productName._id;
    }
}