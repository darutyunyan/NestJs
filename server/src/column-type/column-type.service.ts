import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateColumnTypeDto } from './dto/create-column-type.dto';
import { ColumnType, ColumnTypeDocument } from './schemas/column-type.schema';

@Injectable()
export class ColumnTypeService {
    constructor(@InjectModel(ColumnType.name) private columnTypeModel: Model<ColumnTypeDocument>) { }

    async create(dto: CreateColumnTypeDto): Promise<ColumnType> {
        return await this.columnTypeModel.create({ ...dto });
    }

    async getAll(): Promise<ColumnType[]> {
        return await this.columnTypeModel.find();
    }
    
    async delete(id: ObjectId): Promise<ObjectId> {
        const currentColumnType = await this.columnTypeModel.findById(id);
        if (currentColumnType.products.length) {
            throw new InternalServerErrorException();
        }

        const deletedColumnType = await this.columnTypeModel.findByIdAndDelete(id);
        return deletedColumnType._id;
    }
}
