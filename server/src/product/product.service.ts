import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ProductName, ProductNameDocument } from 'src/product-name/schemas/product-name.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private produtModel: Model<ProductDocument>,
        @InjectModel(ProductName.name) private produtNameModel: Model<ProductNameDocument>) { }

    async create(dto: CreateProductDto): Promise<Product> {
        const productName = await this.produtNameModel.findById(dto.productNameId);
        if (!productName) {
            throw new InternalServerErrorException();
        }

        // Creates a product.
        const product = await this.produtModel.create({
            ...dto,
            productName: dto.productNameId
        });

        // Adds the product ID to the ProductName document.
        await this._addIdToDocument(product.id, productName);

        return product;
    }

    async update(dto: UpdateProductDto, id: ObjectId): Promise<Product> {
        const newProductName = await this.produtNameModel.findById(dto.productNameId);
        if (!newProductName) {
            throw new InternalServerErrorException();
        }

        // Removes product ID from product name and column type documents.
        const product = await this.produtModel.findById(id);
        const oldProductName = await this.produtNameModel.findById(product.productName);
        const productNameIndex = oldProductName.products.indexOf(product.id);
        await this._deleteIdFromDocumentByIndex(oldProductName, productNameIndex);

        // Updates a product.
        const updatedProduct = await this.produtModel.findByIdAndUpdate(id, {
            info: dto.info,
            productName: newProductName
        }, { new: true, useFindAndModify: false });

        // Adds the product ID to the ProductName document.
        await this._addIdToDocument(updatedProduct.id, newProductName);

        return updatedProduct;
    }

    async getAll(): Promise<Product[]> {
        return await this.produtModel.find().populate({
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

    async getById(id: ObjectId): Promise<Product> {
        return await this.produtModel.findById(id).populate({
            path: 'productName',
            populate: {
                path: 'productType'
            },
        });
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        // Removes the product.
        const deletedProduct = await this.produtModel.findByIdAndDelete(id);

        // Removes the product ID fron product name document.
        const productName = await this.produtNameModel.findById(deletedProduct.productName);
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
