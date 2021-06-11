import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from "@nestjs/common";
import { EventsService } from "./events.service";

@Controller('posts')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {};

  
}