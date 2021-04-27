import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ProductName, ProductNameDocument } from 'src/product-name/schemas/product-name.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import * as mongoose from 'mongoose';
@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(ProductName.name) private productNameModel: Model<ProductNameDocument>) { }

    async create(dto: CreateProductDto): Promise<Product> {
        const productName = await this.productNameModel.findById(dto.productNameId);
        if (!productName) {
            throw new InternalServerErrorException();
        }

        // Creates a product.
        const product = await this.productModel.create({
            ...dto,
            productName: dto.productNameId
        });

        // Adds the product ID to the ProductName document.
        await this._addIdToDocument(product.id, productName);

        return product;
    }

    async update(dto: UpdateProductDto, id: ObjectId): Promise<Product> {
        const newProductName = await this.productNameModel.findById(dto.productNameId);
        if (!newProductName) {
            throw new InternalServerErrorException();
        }

        // Removes product ID from product name and column type documents.
        const product = await this.productModel.findById(id);
        const oldProductName = await this.productNameModel.findById(product.productName);
        const productNameIndex = oldProductName.products.indexOf(product.id);
        await this._deleteIdFromDocumentByIndex(oldProductName, productNameIndex);

        // Updates a product.
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, {
            info: dto.info,
            productName: newProductName
        }, { new: true, useFindAndModify: false });

        // Adds the product ID to the ProductName document.
        await this._addIdToDocument(updatedProduct.id, newProductName);

        return updatedProduct;
    }

    async getAll(): Promise<Product[]> {
        return await this.productModel.find().populate({
            path: 'productName',
            populate: {
                path: 'productType'
            }
        }).populate({
            path: 'productName',
            populate: {
                path: 'columnType'
            }
        });
    }

    async getByProductNameId(id: ObjectId): Promise<Product[]> {
        const productName = await this.productNameModel.findById(id);
        return await this.productModel
            .find({ productName: productName })
            .populate('productName');
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        // Removes the product.
        const deletedProduct = await this.productModel.findByIdAndDelete(id);

        // Removes the product ID fron product name document.
        const productName = await this.productNameModel.findById(deletedProduct.productName);
        const productNameIndex = productName.products.indexOf(deletedProduct.id);
        await this._deleteIdFromDocumentByIndex(productName, productNameIndex);

        return deletedProduct._id;
    }

    private async _deleteIdFromDocumentByIndex(document: ProductNameDocument, idIndex: number): Promise<void> {
        if (idIndex !== -1) {
            document.products.splice(idIndex, 1);
            document.save();
        }
    }

    private async _addIdToDocument(id: Product, document: ProductNameDocument): Promise<void> {
        document.products.push(id);
        document.save();
    }
}
