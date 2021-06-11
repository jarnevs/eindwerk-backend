import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Genre, GenreData } from "./genres.model";

@Injectable()
export class GenresService {
  constructor(
    @InjectModel('Genre') private readonly genresModel: Model<Genre>
  ) {}

  async getGenres(): Promise<GenreData[]> {
    try {
      const genres = await this.genresModel.find();
    
      return genres.map(({ id, name }) => ({ id, name }));
    } catch (e) {
      return e.response;
    }
  }

  async createGenre(genreName: string) : Promise<string> {
    const genre = await this.genresModel.findOne({name: genreName});

    if (genre !== null) {
      return genre.id;
    } else {
      const newGenre = await this.genresModel.create({ name: genreName })
      return newGenre.id
    }
  }
}