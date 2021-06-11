import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import *  as bcrypt from 'bcrypt';

import { User, UserData, ArtistData } from "./users.model";
import { ArtistsService } from "src/artists/artists.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly artistsService: ArtistsService,
  ) {}

  async getUserInfo(id: string) {
    try {
      const user = await this.userModel.findById(id);
      let userInfo: any;

      if (user.type === 'user') {
        const { id, title, firstname, lastname, type } = user;
        userInfo = { id, title, firstname, lastname, type }
      } else {
        const { id, artistName, type } = user;
        userInfo = { id, artistName, type }
      }

      return { ...userInfo };
    } catch(e) {
      return e.response;
    }
  }

  async getAllArtists(): Promise<{id: string, artistName: string}[]> {
    try {
      const artists = await this.userModel.find({ type: 'artist' });

      return await this.mapArtists(artists);
    } catch (e) {
      return e.response;
    }
  }

  async getArtist(artistId: string): Promise<{id: string, artistName: string, genreId: string, description: string}> {
    try {
      const exists = await this.userModel.exists({ _id: artistId});

      if (!exists) throw new NotFoundException('User does not exist');

      const artist = await this.userModel.findById(artistId);
      const artistInfo = await this.artistsService.getInfo(artistId);

      return {
        id: artist.id,
        artistName: artist.artistName,
        ...artistInfo
      };
    } catch(e) {
      return e.response;
    }
  }

  async createUser(registerInfo: UserData | ArtistData) : Promise<{id: string}> {
    try {
      const { email, password, type } = registerInfo;
      let newUser;

      const userExists = await this.checkIfUserExists(email);
      if (userExists) throw new ConflictException('User already exists');

      const hashedPassword = bcrypt.hashSync(password, 12);

      if (type === 'user') {
        const { title, firstname, lastname, phone } = registerInfo as UserData;
        newUser = await this.userModel.create({ email, password: hashedPassword, title, firstname, lastname, phone, type });
      } else {
        const { artistName, genre, description } = registerInfo as ArtistData;
        const artistExists = await this.userModel.exists({ artistName }); 

        if (artistExists) throw new ConflictException('Artist already exists');

        newUser = await this.userModel.create({ email, password: hashedPassword, artistName, type });
        await this.artistsService.createArtistInfo(newUser._id, genre, description);
      }
      // const newUser = await this.userModel.create({
      //   firstname, lastname, email, password: hashedPassword,
      // })

      return {
        id: newUser._id,
      };
    } catch (e) {
      return e.response;
    }
  }

  async followArtist(id: string, artistId: string) {
    try {
      const userExists = await this.userModel.exists({_id: id});
      const artistExists = await this.userModel.exists({_id: artistId});

      if (!userExists || !artistExists) throw new NotFoundException('User does not exist');

      await this.userModel.findByIdAndUpdate(
        {_id: id},
        {
          $addToSet: {
            following: artistId
          }
        }
      )

      const user = await this.userModel
        .findById(id)
        .populate('users following', 'id artistName')
        .exec();
      
      const followingInfo  = await this.mapArtists(user.following);

      return {
        id: user.id,
        following: followingInfo,
      };
    } catch(e) {
      return e.response;
    }
  }

  async findUser(email: string) {
    try {
      const userExists = await this.checkIfUserExists(email);

      if (!userExists) return false;

      return await this.userModel.findOne({ email });
    } catch (e) {
      return e.response;
    }
  }

   async getUserFollowing(id: string) {
    try {
      const userExists = await this.userModel.exists({_id: id});

      if (!userExists) throw new NotFoundException('User does not exist');

      const user = await this.userModel
        .findById(id)
        .populate('users following', 'id artistName')
        .exec();
      
      const followingInfo  = await this.mapArtists(user.following);

      return {
        id: user.id,
        following: followingInfo,
      }
    } catch(e) {
      return e.response;
    }
  }

  private async checkIfUserExists(email: string) {
    return await this.userModel.exists({ email });
  }

  private async mapArtists(artists: any[]): Promise<{id: string, artistName: string, genre: string, description: string}[]> {
    return await Promise.all(artists.map( async ({ artistName, _id: id }) => {
      const artistInfo = await this.artistsService.getInfo(id);

      return {
        id,
        artistName,
        genre: artistInfo.genreId,
        description: artistInfo.description,
      }
    }));
  }
}