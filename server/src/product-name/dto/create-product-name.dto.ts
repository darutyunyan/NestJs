import { ObjectId } from "mongoose";

export class CreateProductNameDto {
    readonly name: string;
    readonly productTypeId: ObjectId;
}