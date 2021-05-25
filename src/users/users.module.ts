import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersSchema } from "./users.model";

@Module(
  {
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
  }
)
export class UsersModule {}