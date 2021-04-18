import { Injectable, InternalServerErrorException } from "@nestjs/common";
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
        const currentProductType = await this.productTypeModel.findById(id);
        if (currentProductType.productNames.length) {
            throw new InternalServerErrorException();
        }

        const deletedProductType = await this.productTypeModel.findByIdAndDelete(currentProductType.id);
        return deletedProductType._id;
    }
}