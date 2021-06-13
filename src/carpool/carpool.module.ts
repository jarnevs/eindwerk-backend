import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CarpoolController } from "./carpool.controller";
import { CarpoolService } from "./carpool.service";
import { CarpoolSchema } from "./carpool.model";

@Module(
  {
    imports: [MongooseModule.forFeature([{ name: 'Carpool', schema: CarpoolSchema }])],
    controllers: [CarpoolController],
    providers: [CarpoolService],
  }
)
export class CarpoolModule {}