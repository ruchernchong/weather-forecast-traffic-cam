import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TrafficController } from './traffic.controller';
import { TrafficService } from './traffic.service';

@Module({
  imports: [HttpModule],
  controllers: [TrafficController],
  providers: [TrafficService],
})
export class TrafficModule {}
