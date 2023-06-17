import {
  Controller,
  Get,
  Header,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { TrafficService } from './traffic.service';

@Controller('traffic')
@UseInterceptors(CacheInterceptor)
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Get()
  @Header('Cache-Control', 'public,max-age:86400')
  getTrafficCameras(@Query('dateTime') dateTime: string) {
    return this.trafficService.getTrafficCameras(dateTime);
  }

  @Get(':id')
  getTrafficCameraById(@Param('id') id: string) {
    return this.trafficService.getTrafficCameraById(id);
  }
}
