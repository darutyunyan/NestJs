import { IsNotEmpty, Max, MaxLength } from "class-validator";

export class CreateProductTypeDto {
    @IsNotEmpty()
    readonly name: string;
}