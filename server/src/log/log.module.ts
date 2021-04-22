
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LogController } from "./log.controller";
import { LogService } from "./log.service";
import { Log, LogSchema } from "./schemas/log.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
    providers: [LogService],
    controllers: [LogController],
    exports: [LogService]
})
export class LogModule { }

