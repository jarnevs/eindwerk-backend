import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ArtistsController } from "./artists.controller";
import { ArtistsService } from "./artists.service";
import { ArtistsSchema } from "./artists.model";
import { GenresModule } from "src/genres/genres.module";

@Module(
  {
    imports: [GenresModule, MongooseModule.forFeature([{ name: 'Artist', schema: ArtistsSchema }])],
    controllers: [ArtistsController],
    providers: [ArtistsService],
    exports: [ArtistsService]
  }
)
export class ArtistsModule {}