import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TrafficController } from './traffic.controller';
import { TrafficService } from './traffic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from '../address/addressEntity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([AddressEntity])],
  controllers: [TrafficController],
  providers: [TrafficService],
})
export class TrafficModule {}
