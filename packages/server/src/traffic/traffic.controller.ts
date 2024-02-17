import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { TrafficService } from './traffic.service';
import { TrafficCamera } from '../interfaces';
import { formatDateToISOString } from '../utils';

@Controller('traffic')
@UseInterceptors(CacheInterceptor)
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Get()
  getTrafficCameras(
    @Query('dateTime') dateTime: string,
  ): Promise<TrafficCamera[]> {
    const now = new Date();
    if (!dateTime) {
      dateTime = formatDateToISOString(now);
    }
    return this.trafficService.getTrafficCameras(dateTime);
  }

  @Get(':id')
  getTrafficCameraById(@Param('id') id: string): Promise<TrafficCamera> {
    return this.trafficService.getTrafficCameraById(id);
  }
}
