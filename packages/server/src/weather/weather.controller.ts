import {
  Controller,
  Get,
  Header,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

import { Weather } from '../interfaces';
import { format } from 'date-fns';
import { formatDateToISOString } from '../utils';

@Controller('weather')
@UseInterceptors(CacheInterceptor)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @Header('Cache-Control', 'public,max-age:86400')
  getForecasts(@Query('dateTime') dateTime?: string): Promise<Weather[]> {
    const now = new Date();
    if (!dateTime) {
      dateTime = formatDateToISOString(now);
    }
    return this.weatherService.getForecasts(dateTime);
  }
}
