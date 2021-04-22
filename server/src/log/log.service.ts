import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Log, LogDocument } from "./schemas/log.schema";

@Injectable()
export class LogService {

    constructor(
        @InjectModel(Log.name) private logModel: Model<LogDocument>) { }

    async create(path: string, message: string, stackTrace: string) {
        return await this.logModel.create({
            dateCreation: new Date(),
            path: path,
            message: message,
            stackTrace: stackTrace
        })
    }

    async getAll(): Promise<Log[]> {
        return await this.logModel.find().sort({dateCreation: -1});
    }

}