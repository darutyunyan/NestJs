import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { BusinessException } from 'src/shared/business.exception';
import { CreateColumnTypeDto } from './dto/create-column-type.dto';
import { ColumnType, ColumnTypeDocument } from './schemas/column-type.schema';

@Injectable()
export class ColumnTypeService {
    constructor(
        @InjectModel(ColumnType.name) private columnTypeModel: Model<ColumnTypeDocument>,
        private configService: ConfigService) { }

    async create(dto: CreateColumnTypeDto): Promise<ColumnType> {
        return await this.columnTypeModel.create({ ...dto });
    }

    async getAll(): Promise<ColumnType[]> {
        return await this.columnTypeModel.find();
    }
    
    async delete(id: ObjectId): Promise<ObjectId> {
        const products = await (await this.columnTypeModel.findById(id)).products;
        if (products.length) {
            throw new BusinessException(this.configService.get('COLUMN_TYPE_DELETE_MESSAGE'));
        }

        const deletedColumnType = await this.columnTypeModel.findByIdAndDelete(id);
        return deletedColumnType._id;
    }
}
