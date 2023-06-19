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
import { TrafficCamera } from '../interfaces/traffic.interface';
import { Observable } from 'rxjs';

@Controller('traffic')
@UseInterceptors(CacheInterceptor)
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Get()
  @Header('Cache-Control', 'public,max-age:86400')
  getTrafficCameras(
    @Query('dateTime') dateTime: string,
  ): Promise<TrafficCamera[]> {
    return this.trafficService.getTrafficCameras(dateTime);
  }

  @Get(':id')
  getTrafficCameraById(
    @Param('id') id: string,
  ): Promise<Observable<TrafficCamera>> {
    return this.trafficService.getTrafficCameraById(id);
  }
}
