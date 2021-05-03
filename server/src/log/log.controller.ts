import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { LogService } from "./log.service";
import { Log } from "./schemas/log.schema";

@UseGuards(JwtAuthGuard)
@Controller('log')
export class LogController {
    constructor(private logService: LogService) { }

    @Get()
    getAll(): Promise<Log[]> {
        return this.logService.getAll();
    }
}
