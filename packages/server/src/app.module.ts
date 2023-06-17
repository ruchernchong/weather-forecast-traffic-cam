import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrafficModule } from './traffic/traffic.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot(),
    HttpModule,
    TrafficModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
