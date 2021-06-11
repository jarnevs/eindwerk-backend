import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersSchema } from "./users.model";
import { ArtistsModule } from "src/artists/artists.module";

@Module(
  {
    imports: [ArtistsModule, MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
  }
)
export class UsersModule {}