import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { BusinessException } from "src/shared/exeptions/business.exception";
import { CreateProductTypeDto } from "./dto/create-product-type.dto";
import { ProductType, ProductTypeDocument } from "./schemas/product-type.schema";

@Injectable()
export class ProductTypeService {

    constructor(
        @InjectModel(ProductType.name) private productTypeModel: Model<ProductTypeDocument>,
        private configService: ConfigService) { }

    async create(dto: CreateProductTypeDto): Promise<ProductType> {
        return await this.productTypeModel.create({ ...dto });
    }

    async getAll(): Promise<ProductType[]> {
        return await this.productTypeModel
            .find()
            .populate('productNames');
    }

    // Retrive ProductTypes that contains products.
    async getAllProucts(): Promise<ProductType[]> {
        const productTypes = await this.productTypeModel
            .find()
            .populate({
                path: 'productNames',
                match: { products: { $exists: true, $type: 'array', $ne: [] } }
            })

        return productTypes.filter(a => a.productNames.length);
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const productNames = await (await this.productTypeModel.findById(id)).productNames;
        if (productNames.length) {
            throw new BusinessException(this.configService.get('PRODUCT_TYPE_DELETE_MESSAGE'));
        }

        const deletedProductType = await this.productTypeModel.findByIdAndDelete(id);
        return deletedProductType._id;
    }
}