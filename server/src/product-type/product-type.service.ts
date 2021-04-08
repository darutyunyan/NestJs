import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateProductTypeDto } from "./dto/create-product-type.dto";
import { ProductType, ProductTypeDocument } from "./schemas/product-type.schema";

@Injectable()
export class ProductTypeService {

    constructor(@InjectModel(ProductType.name) private productTypeModel: Model<ProductTypeDocument>) { }

    async create(dto: CreateProductTypeDto): Promise<ProductType> {
        return await this.productTypeModel.create({ ...dto });
    }

    async getAll(): Promise<ProductType[]> {
        return await this.productTypeModel.find();
    }
    
    async delete(id: ObjectId): Promise<ObjectId> {
        const productType = await this.productTypeModel.findByIdAndDelete(id);
        return productType._id;
    }
}