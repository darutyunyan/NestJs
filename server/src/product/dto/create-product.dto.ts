import { IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateProductDto {
    @IsNotEmpty()
    readonly info: string;

    @IsNotEmpty()
    readonly productNameId: ObjectId;

    @IsNotEmpty()
    readonly columnTypeId: ObjectId;
}