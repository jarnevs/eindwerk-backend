import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventsController } from "./events.controller";
import { EventsSchema } from "./events.model";
import { EventsService } from "./events.service";

@Module(
  {
    imports: [MongooseModule.forFeature([{ name: 'Event', schema: EventsSchema }])],
    controllers: [EventsController],
    providers: [EventsService],
  }
)
export class EventsModule {}