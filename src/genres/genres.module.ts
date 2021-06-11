import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GenresController } from "./genres.controller";
import { GenresService } from "./genres.service";
import { GenresSchema } from "./genres.model";

@Module(
  {
    imports: [MongooseModule.forFeature([{ name: 'Genre', schema: GenresSchema }])],
    controllers: [GenresController],
    providers: [GenresService],
    exports: [GenresService]
  }
)
export class GenresModule {}