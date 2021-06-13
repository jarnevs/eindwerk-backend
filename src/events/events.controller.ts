import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from "@nestjs/common";
import { EventsService } from "./events.service";

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {};

  @Get('artist/:id')
  async getEventsArtist(
    @Param('id') artistId: string,
  ) {
    return this.eventsService.getEventsArtist(artistId);
  }

  @Get('carpool')
  async getEventsCarpool(
    @Request() req
  ) {
    const { user } = req;
    return this.eventsService.getEventsCarpool(user.userId);
  }

  @Get(':id')
  async getEvent(
    @Param('id') id: string,
  ) {
    return this.eventsService.getEvent(id);
  }

  @Post()
  async createNewEvent(
    @Request() req,
    @Body() eventData,
  ) {
    const { user } = req;
    return this.eventsService.createEvent(eventData, user.userId);
  }

  @Patch(':id')
  async changeStatusUserEvent(
    @Request() req,
    @Param('id') id,
    @Body('status') status: string,
  ) {
    const { user } = req;
    return this.eventsService.changeUserStatusEvent(id, user.userId, status);
  }
}