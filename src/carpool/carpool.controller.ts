import { Body, Controller, Get, Post, Request, Param, Patch } from '@nestjs/common';
import { Public } from 'src/public.decorator';
import { CarpoolService } from './carpool.service';

@Controller('carpool')
export class CarpoolController {
  constructor(private readonly carpoolService : CarpoolService) {}

  @Get('event/:id')
  async getCarpoolSpotsEvent(
    @Param('id') eventId
  ) {
    return await this.carpoolService.getCarpoolSpotsEvent(eventId);
  }

  @Post()
  async createCarpoolSpot(
    @Request() req,
    @Body() carpoolData
  ) {
    const { user } = req;
    return await this.carpoolService.createCarpoolSpot(carpoolData, user.userId);
  }

  @Patch(':id')
  async changeUserStatusEvent(
    @Request() req,
    @Param('id') id: string,
    @Body('status') status: boolean,
  ) {
    const { user } = req;
    return await this.carpoolService.changeStatusCarpool(id, user.userId, status);
  }
}
