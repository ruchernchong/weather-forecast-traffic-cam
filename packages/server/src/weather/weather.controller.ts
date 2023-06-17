import {
  Controller,
  Get,
  Header,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('weather')
@UseInterceptors(CacheInterceptor)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @Header('Cache-Control', 'public,max-age:86400')
  getForecasts(@Query('dateTime') dateTime: string) {
    return this.weatherService.getForecasts(dateTime);
  }
}
