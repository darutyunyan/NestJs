import { IsNotEmpty } from "class-validator";

export class SendEmailDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly phone: string;
    
    @IsNotEmpty()
    readonly email: string;
    
    @IsNotEmpty()
    readonly productPosition: string;
}