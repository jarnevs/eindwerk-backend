import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {  Event, EventData } from "./events.model";

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private readonly eventsModel: Model<Event>
  ) {}

  async getEvents() {
    try {
      const events = await this.eventsModel.find();
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

  async createEvent() {
    try {
      
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