import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/public.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService : UsersService) {}

  @Public()
  @Post('register')
  async createUser(
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.usersService.createUser(firstname, lastname, email, password);
  }

  // @Post('login')
  // async login(
  //   @Body('email') email: string,
  // ) {
  //   return await this.usersService.login(email);
  // }
}
