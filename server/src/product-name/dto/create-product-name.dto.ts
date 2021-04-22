import { IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateProductNameDto {
    @IsNotEmpty()
    readonly name: string;
    
    @IsNotEmpty()
    readonly productTypeId: ObjectId;

    @IsNotEmpty()
    readonly columnTypeId: ObjectId;
}