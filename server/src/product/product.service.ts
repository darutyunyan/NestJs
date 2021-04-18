import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
        const productName = await this.produtNameModel.findById(dto.productNameId);
        const columnType = await this.columnTypeModel.findById(dto.columnTypeId);
        if (!productName || !columnType) {
            throw new InternalServerErrorException();
        }

        // Creates a product.
        const product = await this.produtModel.create({
            ...dto,
            productName: dto.productNameId,
            columnType: dto.columnTypeId
        });

        // Adds the product ID to the product name document.
        productName.products.push(product.id);
        productName.save();

        // Adds the product ID to the column type doceumnt.
        columnType.products.push(product.id);
        columnType.save();

        return product;
    }

    async update(dto: UpdateProductDto, id: ObjectId): Promise<Product> {
        const productName = await this.produtNameModel.findById(dto.productNameId);
        const columnType = await this.columnTypeModel.findById(dto.columnTypeId);
        if (!productName || !columnType) {
            throw new InternalServerErrorException();
        }

        return await this.produtModel.findByIdAndUpdate(id, {
            info: dto.info,
            productName: productName,
            columnType: columnType
        }, { new: true, useFindAndModify: false });
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
        // Removes the product.
        const deletedProduct = await this.produtModel.findByIdAndDelete(id);

        // Removes the product ID fron product name document.
        const productName = await this.produtNameModel.findById(deletedProduct.productName);
        const productNameIndex = productName.products.indexOf(deletedProduct.id);
        if (productNameIndex !== -1) {
            productName.products.splice(productNameIndex, 1);
            productName.save();
        }

        // Removes the product ID fron column type document.
        const columnType = await this.columnTypeModel.findById(deletedProduct.columnType);
        const columnTypeIndex = columnType.products.indexOf(deletedProduct.id);
        if (columnTypeIndex !== -1) {
            columnType.products.splice(columnTypeIndex, 1);
            columnType.save();
        }

        return deletedProduct._id;
    }
}
