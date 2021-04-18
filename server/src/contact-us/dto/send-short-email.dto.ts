import { IsNotEmpty } from "class-validator";

export class SendShortEmailDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly phone: string;
    
    @IsNotEmpty()
    readonly message: string;
}