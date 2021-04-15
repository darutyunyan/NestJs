import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ColumnType, ColumnTypeDocument } from 'src/column-type/schemas/column-type.schema';
import { ProductName, ProductNameDocument } from 'src/product-name/schemas/product-name.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private produtModel: Model<ProductDocument>,
        @InjectModel(ProductName.name) private produtNameModel: Model<ProductNameDocument>,
        @InjectModel(ColumnType.name) private columnTypeModel: Model<ColumnTypeDocument>) { }

    async create(dto: CreateProductDto): Promise<Product> {
        return await this.produtModel.create({
            ...dto,
            productName: dto.productNameId,
            columnType: dto.columnTypeId
        });
    }

    async update(dto: UpdateProductDto, id: ObjectId): Promise<Product> {
        const productName = await this.produtNameModel.findById(dto.productNameId);
        const columnType = await this.columnTypeModel.findById(dto.columnTypeId);
        return await this.produtModel.findByIdAndUpdate(id, {
            info: dto.info,
            productName: productName,
            columnType: columnType
        },{new: true, useFindAndModify: false});
    }

    async getAll(): Promise<Product[]> {
        return await this.produtModel.find().populate({
            path: 'productName',
            populate: {
                path: 'productType'
            }
        }).populate('columnType');
    }

    async getById(id: ObjectId): Promise<Product> {
        return await this.produtModel.findById(id).populate({
            path: 'productName',
            populate: {
                path: 'productType'
            }
        }).populate('columnType');
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const product = await this.produtModel.findByIdAndDelete(id);
        return product._id;
    }
}
