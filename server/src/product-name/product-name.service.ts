import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateProductNameDto } from "./dto/create-product-name.dto";
import { ProductName, ProductNameDocument } from "./schemas/product-name.schema";

@Injectable()
export class ProductNameService {

    constructor(@InjectModel(ProductName.name) private productNameModel: Model<ProductNameDocument>) { }

    async create(dto: CreateProductNameDto): Promise<ProductName> {
        return await this.productNameModel.create({ 
            ...dto, 
            productType: dto.productTypeId 
        });
    }

    async getAll(): Promise<ProductName[]> {
        return await this.productNameModel.find().populate('productType');
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const productName = await this.productNameModel.findByIdAndDelete(id);
        return productName._id;
    }
}