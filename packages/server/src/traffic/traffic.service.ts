import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DATA_GOV_SG_API_URL, OPENSTREETMAP_API_URL } from '../config';
import { Location, TrafficCamera } from '../interfaces';
import { filterByUniqueLocation, sortFormattedAddress } from '../utils';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './schemas/address.schema';
import { Model } from 'mongoose';

@Injectable()
export class TrafficService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
    private readonly httpService: HttpService,
  ) {}
  private cameras: TrafficCamera[] = [];

  async getLocationFromCoordinates(location: Location): Promise<string> {
    const { data } = await this.httpService.axiosRef.get(
      `${OPENSTREETMAP_API_URL}/reverse`,
      {
        params: {
          lat: location.latitude,
          lon: location.longitude,
          format: 'json',
        },
      },
    );

    return data.display_name;
  }

  async getTrafficCameras(dateTime?: string): Promise<TrafficCamera[]> {
    const existingAddresses = await this.addressModel.find().exec();
    console.log(`existingAddresses`, existingAddresses.length);
    const existingAddressesMap = new Map<string, Address>(
      existingAddresses.map((address) => [address.cameraId, address]),
    );

    const { data } = await this.httpService.axiosRef.get(
      `${DATA_GOV_SG_API_URL}/transport/traffic-images?date_time=${dateTime}`,
    );

    const cameras: TrafficCamera[] = data.items.find(
      ({ cameras }) => cameras,
    )?.cameras;
    console.log(`cameras`, cameras.length);

    const newCameras: TrafficCamera[] = [];
    await Promise.all(
      cameras.map(async (camera) => {
        if (!existingAddressesMap.has(camera.camera_id)) {
          const displayName = await this.getLocationFromCoordinates(
            camera.location,
          );
          const address = new this.addressModel({
            cameraId: camera.camera_id,
            displayName,
          });

          await address.save();
          newCameras.push(camera);
        }
      }),
    );
    console.log(`newCameras`, newCameras);
    console.log(`newCameras`, newCameras.length);

    const mappedCameras = cameras.map((camera) => {
      const existingAddress = existingAddressesMap.get(camera.camera_id);
      return { ...camera, formattedAddress: existingAddress?.displayName };
    });

    const allCameras = [...mappedCameras, ...newCameras];
    console.log(`allCameras`, allCameras.length);
    console.log(filterByUniqueLocation(allCameras).sort(sortFormattedAddress));

    return filterByUniqueLocation(allCameras).sort(sortFormattedAddress);
  }

  async getTrafficCameraById(id: string): Promise<TrafficCamera> {
    return this.cameras.find(
      ({ camera_id }: Pick<TrafficCamera, 'camera_id'>) => camera_id === id,
    );
  }
}
