import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateProductNameDto } from "./dto/create-product-name.dto";
import { ProductName, ProductNameDocument } from "./schemas/product-name.schema";

@Injectable()
export class ProductNameService {

    constructor(@InjectModel(ProductName.name) private productNameModel: Model<ProductNameDocument>) { }

    async create(dto: CreateProductNameDto): Promise<ProductName> {
        const productName = await this.productNameModel.create({...dto,productType: dto.productTypeId});
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