import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/public.decorator';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService : GenresService) {}

  @Get()
  async getGenres() {
    return this.genresService.getGenres();
  }
}
