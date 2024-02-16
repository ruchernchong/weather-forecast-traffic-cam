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

  getLocationFromCoordinates(location: Location): Promise<string> {
    return this.httpService.axiosRef
      .get(`${OPENSTREETMAP_API_URL}/reverse`, {
        params: {
          lat: location.latitude,
          lon: location.longitude,
          format: 'json',
        },
      })
      .then(({ data }) => data.display_name);
  }

  async getTrafficCameras(dateTime?: string): Promise<TrafficCamera[]> {
    this.cameras = await this.httpService.axiosRef
      .get(
        `${DATA_GOV_SG_API_URL}/transport/traffic-images?date_time=${dateTime}`,
      )
      .then(async ({ data }) => {
        const cameras: TrafficCamera[] = data.items
          .find(({ cameras }) => cameras)
          // For demo purposes, I will slice the dataset into smaller one
          .cameras.slice(0, 20);

        const addressTable = await this.addressModel.find().exec();
        // const isAddressUpdated = addressTable.every(
        //   ({ displayName }) => displayName,
        // );

        // if (
        //   addressTable.length === 0 ||
        //   cameras.length !== addressTable.length ||
        //   !isAddressUpdated
        // ) {
        //   await Promise.all(
        //     cameras.map(async (camera) => {
        //       const displayName: string = await this.getLocationFromCoordinates(
        //         camera.location,
        //       );
        //
        //       const address = new this.addressModel({
        //         cameraId: camera.camera_id,
        //         displayName,
        //       });
        //
        //       return address.save();
        //     }),
        //   );
        // }

        return filterByUniqueLocation(
          cameras.map((camera) => {
            const formattedAddress = addressTable.find(
              (address) => camera.camera_id === address.cameraId,
            )?.displayName;

            return {
              ...camera,
              formattedAddress,
            };
          }),
        ).sort(sortFormattedAddress);
      })
      .catch((error) => {
        console.error(error);
        return [];
      });

    return this.cameras;
  }

  async getTrafficCameraById(id: string): Promise<TrafficCamera> {
    return this.cameras.find(
      ({ camera_id }: Pick<TrafficCamera, 'camera_id'>) => camera_id === id,
    );
  }
}
