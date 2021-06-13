import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {  Event, EventData } from "./events.model";

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private readonly eventsModel: Model<Event>
  ) {}

  async getEventsArtist(artistId: string) {
    try {
      const events = await this.eventsModel.find({artistId});
      return this.mapEvents(events);
    } catch (e) {
      return e.response;
    }
  }

  async getEvent(eventId: string) {
    try {
      const event = await this.eventsModel.findById(eventId);
      return {
        id: event.id,
        title: event.title,
        location: event.location,
        date: event.date,
        description: event.description,
        going: event.going,
        maybe: event.maybe,
        notGoing: event.notGoing,
      }
    } catch (e) {
      return e.response;
    }
  }

  async getEventsCarpool(userId: string) {
    try {
      const events = await this.eventsModel.find({ going: userId });

      return events.map((event) => ({ id: event.id, title: event.title, date: event.date }))
    } catch(e) {
      return e.response;
    }
  };

  async createEvent(eventData: EventData, artistId: string) {
    try {
      const event = await this.eventsModel.create({
        ...eventData,
        artistId,
      })

      return {
        id: event.id,
      }

    } catch (e) {
      return e.response;
    }
  }

  async changeUserStatusEvent(eventId: string, userId: string, status: string) {
    try {
      await this.eventsModel.findByIdAndUpdate(
        {_id: eventId},
        {
          $pull: {
            going: userId,
            maybe: userId,
            notGoing: userId,
          }
        }
      )

      if (status === 'going') {
        await this.eventsModel.findByIdAndUpdate(
          {_id: eventId},
          {
            $addToSet: {
              going: userId,
            }
          }
        )
      } else if (status === 'maybe') {
        await this.eventsModel.findByIdAndUpdate(
          {_id: eventId},
          {
            $addToSet: {
              maybe: userId,
            }
          }
        )
      } else {
        await this.eventsModel.findByIdAndUpdate(
          {_id: eventId},
          {
            $addToSet: {
              notGoing: userId,
            }
          }
        )
      }

      return null;
    } catch (e) {
      return e.response;
    }
  }

  private mapEvents(events: any[]) {
    return events.map(({ _id, title, location, date, description, going, maybe, notGoing }) => ({
      id: _id,
      title,
      location,
      date,
      description,
      going,
      maybe,
      notGoing,
    }));
  }
}