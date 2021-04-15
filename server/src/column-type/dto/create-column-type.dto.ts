import { IsNotEmpty } from "class-validator";

export class CreateColumnTypeDto {
    @IsNotEmpty()
    readonly name: string;
}