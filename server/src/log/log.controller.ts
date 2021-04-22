import { Controller, Get } from "@nestjs/common";
import { LogService } from "./log.service";
import { Log } from "./schemas/log.schema";

@Controller('log')
export class LogController {
    constructor(private logService: LogService) { }

    @Get()
    getAll(): Promise<Log[]> {
        return this.logService.getAll();
    }
}
