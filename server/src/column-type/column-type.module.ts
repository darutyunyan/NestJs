import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnTypeController } from './column-type.controller';
import { ColumnTypeService } from './column-type.service';
import { ColumnType, ColumnTypeSchema } from './schemas/column-type.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: ColumnType.name, schema: ColumnTypeSchema }])],
    controllers: [ColumnTypeController],
    providers: [ColumnTypeService]
})
export class ColumnTypeModule { }
