import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GenresService } from "src/genres/genres.service";

import { Artist, ArtistData } from "./artists.model";

@Injectable()
export class ArtistsService {
  constructor(
    @InjectModel('Artist') private readonly artistsModel: Model<Artist>,
    private readonly genresService: GenresService 
  ) {}

  async getInfo(id: string): Promise<{genreId: string, description: string}> {
    const {genreId, description} = await this.artistsModel.findById(id);

    return {
      genreId,
      description
    }
  }

  async createArtistInfo(artistId: string, genre: string, description: string) : Promise<any> {
    try {
      const genreId = await this.genresService.createGenre(genre);

      const artistInfo =  await this.artistsModel.create({ _id: artistId, genreId, description });

      return artistInfo;
    } catch (e) {
      return e;
    }
  }
}