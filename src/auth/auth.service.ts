import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import *  as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findUser(email);

      if (!user) {
        throw new NotFoundException('Email and/or password is wrong');
      }

      const passwordsEqual = bcrypt.compareSync(password, user.password);

      if (!passwordsEqual) {
        throw new BadRequestException('Email and/or password is wrong');
      }

      return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      }
    } catch (e) {
      return e.response;
    }
  }

  async login(user: any) {
    try {
      if (!user) {
        throw new UnauthorizedException();
      } 
      
      if (user.statusCode === 404) {
        throw new NotFoundException(user.message);
      }

      if (user.statusCode === 400) {
        throw new BadRequestException(user.message);
      }

      const payload = { email: user.email, sub: user.id };

      return {
        accesToken: this.jwtService.sign(payload),
      }
    } catch (e) {
      return e.response;
    }
  }
}
