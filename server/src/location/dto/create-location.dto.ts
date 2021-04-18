import { IsNotEmpty } from "class-validator";

export class CreateLocationDto {
    @IsNotEmpty()
    readonly lat: string;
    
    @IsNotEmpty()
    readonly lng: string;
}