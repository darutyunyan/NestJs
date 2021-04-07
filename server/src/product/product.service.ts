import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private produtModel: Model<ProductDocument>) { }

    async create(dto: CreateProductDto): Promise<Product> {
        const product = await this.produtModel.create({
            ...dto,
            productName: dto.productNameId,
            columnType: dto.columnTypeId
        });
        return product;
    }

    async getAll(): Promise<Product[]> {
        const products = await this.produtModel.find().populate({
            path: 'productName', 
            populate: { 
                path: 'productType' 
            }
        }).populate('columnType');
        
        return products;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const product = await this.produtModel.findByIdAndDelete(id);
        return product._id;
    }
}
