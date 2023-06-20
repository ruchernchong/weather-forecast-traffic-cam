import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { filterByUniqueLocation, sortFormattedAddress } from '../utils';

import { Location, TrafficCamera } from '../interfaces';
import { DATA_GOV_SG_API_URL, OPENSTREETMAP_API_URL } from '../config';

@Injectable()
export class TrafficService {
  constructor(private readonly httpService: HttpService) {}
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
    const cameras = await this.httpService.axiosRef
      .get(
        `${DATA_GOV_SG_API_URL}/transport/traffic-images?date_time=${dateTime}`,
      )
      .then(async ({ data }) => {
        const cameras: TrafficCamera[] = data.items.find(
          ({ cameras }) => cameras,
        ).cameras;

        return filterByUniqueLocation(
          await Promise.all(
            // I need to truncate the number of locations for the demo as I have already racked up almost >US$500 of API calls to the Google Geocoding API while trying to get the caching mechanism working
            cameras.slice(0, 5).map(async (camera) => {
              const formattedAddress: string =
                await this.getLocationFromCoordinates(camera.location);
              return {
                ...camera,
                formattedAddress,
              };
            }),
          ),
        ).sort(sortFormattedAddress);
      });

    this.cameras = cameras;

    return cameras;
  }

  async getTrafficCameraById(id: string): Promise<TrafficCamera> {
    return this.cameras.find(
      ({ camera_id }: Pick<TrafficCamera, 'camera_id'>) => camera_id === id,
    );
  }
}
