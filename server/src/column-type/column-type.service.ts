import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateColumnTypeDto } from './dto/create-column-type.dto';
import { ColumnType, ColumnTypeDocument } from './schemas/column-type.schema';

@Injectable()
export class ColumnTypeService {
    constructor(@InjectModel(ColumnType.name) private columnTypeModel: Model<ColumnTypeDocument>) { }

    async create(dto: CreateColumnTypeDto): Promise<ColumnType> {
        const columnType = await this.columnTypeModel.create({ ...dto });
        return columnType;
    }

    async getAll(): Promise<ColumnType[]> {
        const columnTypes = await this.columnTypeModel.find().populate('productNames');
        return columnTypes;
    }
    
    async delete(id: ObjectId): Promise<ObjectId> {
        const columnType = await this.columnTypeModel.findByIdAndDelete(id);
        return columnType._id;
    }
}
