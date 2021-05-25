import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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
        throw new NotFoundException('User does not exist');
      }

      const passwordsEqual = bcrypt.compareSync(password, user.password);

      if (!passwordsEqual) {
        throw new BadRequestException('User does not exist');
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
    const payload = { email: user.email, sub: user.id };

    return {
      acces_token: this.jwtService.sign(payload),
    }
  }
}
