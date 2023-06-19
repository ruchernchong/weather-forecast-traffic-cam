import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { TrafficModule } from './traffic/traffic.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot(),
    TrafficModule,
    WeatherModule,
  ],
})
export class AppModule {}
