import { ObjectId } from "mongoose";
import { CreateLocationDto } from "./create-location.dto";

export class UpdateLocationDto extends CreateLocationDto { 
    id: ObjectId;
}