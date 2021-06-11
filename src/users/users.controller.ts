import { Body, Controller, Get, Param, Patch, Post, Req, Request } from '@nestjs/common';
import { Public } from 'src/public.decorator';
import { ArtistData, UserData } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService : UsersService) {}

  @Get('profile')
  async getUserInfo(
    @Request() req
  ) {
    const { user } = req;
    return await this.usersService.getUserInfo(user.userId);
  }

  @Get('following')
  async getUserFollowing(
    @Request() req
  ) {
    const { user } = req;
    return await this.usersService.getUserFollowing(user.userId);
  }
  
  @Get('artists')
  async getAllArtists() {
    return await this.usersService.getAllArtists();
  }

  @Get('artists/:id')
  async getArtist(
    @Param('id') artistId: string,
  ) {
    return await this.usersService.getArtist(artistId);
  }

  @Public()
  @Post('register')
  async createUser(
    @Body() registerInfo: UserData | ArtistData,
  ) {
    return await this.usersService.createUser(registerInfo);
  }

  @Patch('follow')
  async followArtist(
    @Request() req,
    @Body('artistId') artistId: string,
  ) {
    const { user } = req;

    return await this.usersService.followArtist(user.userId, artistId);
  }
  // @Post('login')
  // async login(
  //   @Body('email') email: string,
  // ) {
  //   return await this.usersService.login(email);
  // }
}
