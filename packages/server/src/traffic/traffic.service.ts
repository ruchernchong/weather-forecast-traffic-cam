import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from '../address/addressEntity';

import { DATA_GOV_SG_API_URL, OPENSTREETMAP_API_URL } from '../config';
import { Location, TrafficCamera } from '../interfaces';
import { filterByUniqueLocation, sortFormattedAddress } from '../utils';

@Injectable()
export class TrafficService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
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

  async getTrafficCameras(dateTime?: string) {
    this.cameras = await this.httpService.axiosRef
      .get(
        `${DATA_GOV_SG_API_URL}/transport/traffic-images?date_time=${dateTime}`,
      )
      .then(async ({ data }) => {
        const cameras: TrafficCamera[] = data.items
          .find(({ cameras }) => cameras)
          // For demo purposes, I will slice the dataset into smaller one
          .cameras.slice(0, 20);

        const addressTable = await this.addressRepository.find();
        const isAddressUpdated = addressTable.every(
          ({ displayName }) => displayName,
        );

        if (
          addressTable.length === 0 ||
          cameras.length !== addressTable.length ||
          !isAddressUpdated
        ) {
          await Promise.all(
            cameras.map(async (camera) => {
              const displayName: string = await this.getLocationFromCoordinates(
                camera.location,
              );

              const address = new AddressEntity();
              address.cameraId = camera.camera_id;
              address.displayName = displayName;
              return this.addressRepository.save(address);
            }),
          );
        }

        return filterByUniqueLocation(
          cameras.map((camera) => {
            const formattedAddress = addressTable.find(
              ({ cameraId }) => camera.camera_id === cameraId,
            )?.displayName;

            return {
              ...camera,
              formattedAddress,
            };
          }),
        ).sort(sortFormattedAddress);
      });

    return this.cameras;
  }

  async getTrafficCameraById(id: string): Promise<TrafficCamera> {
    return this.cameras.find(
      ({ camera_id }: Pick<TrafficCamera, 'camera_id'>) => camera_id === id,
    );
  }
}
