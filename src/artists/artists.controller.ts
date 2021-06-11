import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/public.decorator';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService : ArtistsService) {}
  
  // @Post('login')
  // async login(
  //   @Body('email') email: string,
  // ) {
  //   return await this.usersService.login(email);
  // }
}
