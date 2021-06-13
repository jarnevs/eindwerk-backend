import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Carpool, CarpoolData } from "./carpool.model";

@Injectable()
export class CarpoolService {
  constructor(
    @InjectModel('Carpool') private readonly carpoolModel: Model<Carpool>
  ) {}
  
  async getCarpoolSpotsEvent(eventId: string) {
    try {
      const carpoolSpots = await this.carpoolModel.find({ concert: eventId }).populate('userId', 'id firstname lastname').populate('concert', 'title');
      return this.mapCarpoolSpots(carpoolSpots);
    } catch (e) {
      return e.response;
    }
  }

  async createCarpoolSpot(carpoolData: CarpoolData, userId: string) {
    try {
      const carpoolSpot = await this.carpoolModel.create({
        ...carpoolData,
        userId,
      });

      console.log(carpoolSpot);

      return {
        id: carpoolSpot.id,
      }
    } catch(e) {
      console.log(e);
      return e.response;
    }
  }

  async changeStatusCarpool(spotId: string, userId: string, add: boolean) {
    try {
      if (add) {
        await this.carpoolModel.findByIdAndUpdate(
          { _id: spotId },
          {
            $addToSet: {
              accepted: userId,
            }
          }
        )
      } else {
        await this.carpoolModel.findByIdAndUpdate(
          { _id: spotId },
          {
            $pull: {
              accepted: userId,
            }
          }
        )
      }
    } catch(e) {
      return e.response;
    }
  }

  private mapCarpoolSpots(carpoolSpots) {
    return carpoolSpots.map((spot) => {
      return {
        id: spot.id,
        concert: spot.concert.title,
        seats: spot.seats,
        time: spot.time,
        location: spot.location,
        user: {
          id: spot.userId.id,
          firstname: spot.userId.firstname,
          lastname: spot.userId.lastname,
        },
        accepted: spot.accepted,
      }
    })
  }
}