import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import *  as bcrypt from 'bcrypt';

import { User, UserObject } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ) : Promise<UserObject> {
    try {
      const userExists = await this.checkIfUserExists(email);
      if (userExists) throw new ConflictException('User already exists');

      const hashedPassword = bcrypt.hashSync(password, 12);

      const newUser = await this.userModel.create({
        firstname, lastname, email, password: hashedPassword,
      })

      return {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email
      };
    } catch (e) {
      return e.response;
    }
  }

  async findUser(email: string) {
    try {
      const userExists = await this.checkIfUserExists(email);

      if (!userExists) return false;

      return await this.userModel.findOne({ email });
      // const passwordsEqual = bcrypt.compareSync(password, user.password);

      // if (!passwordsEqual) {
      //   throw new BadRequestException('User does not exist');
      // }
      
      // user.password = null;

      // return user;
    } catch (e) {
      return e.response;
    }
  }

  private async checkIfUserExists(email: string): Promise<boolean> {
    return await this.userModel.exists({ email });
  }
}