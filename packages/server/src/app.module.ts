import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { TrafficModule } from './traffic/traffic.module';
import { WeatherModule } from './weather/weather.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AddressEntity } from './address/addressEntity';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'sqlite',
      database: './src/address.db',
      entities: [AddressEntity],
      synchronize: true,
    }),
    TrafficModule,
    WeatherModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
