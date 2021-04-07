import { ObjectId } from "mongoose";

export class CreateProductDto {
    readonly info: string;
    readonly productNameId: ObjectId;
    readonly columnTypeId: ObjectId;
}