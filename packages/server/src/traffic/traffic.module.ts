import { Module } from '@nestjs/common';
import { TrafficController } from './traffic.controller';
import { TrafficService } from './traffic.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './schemas/address.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'User-Agent': 'Weather Forecast Traffic Cam',
      },
    }),
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  controllers: [TrafficController],
  providers: [TrafficService],
})
export class TrafficModule {}
