import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { EMPTY, of } from 'rxjs';
import { filterByUniqueLocation, sortFormattedAddress } from '../utils';

@Injectable()
export class TrafficService {
  constructor(private readonly httpService: HttpService) {}
  private cameras: any[] = [];

  API_URL = `https://api.data.gov.sg/v1`;

  getLocationFromCoordinates(location) {
    return this.httpService.axiosRef
      .get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          latlng: `${location.latitude},${location.longitude}`,
          key: process.env.GOOGLE_MAP_API_KEY,
        },
      })
      .then(({ data }) => data.results[0].formatted_address);
  }

  async getTrafficCameras(dateTime?: string) {
    const cameras = await this.httpService.axiosRef
      .get(`${this.API_URL}/transport/traffic-images?date_time=${dateTime}`)
      .then(async ({ data }) => {
        const cameras = data.items.find(({ cameras }) => cameras).cameras;

        return filterByUniqueLocation(
          await Promise.all(
            // I need to truncate the number of locations for the demo as I have already racked up almost >US$500 of API calls to the Google Geocoding API while trying to get the caching mechanism working
            cameras.slice(0, 5).map(async (camera) => {
              const formattedAddress = await this.getLocationFromCoordinates(
                camera.location,
              );
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

  async getTrafficCameraById(id) {
    const camera = this.cameras.find(({ camera_id }) => camera_id === id);

    if (camera) {
      return of(camera);
    }

    return EMPTY;
  }
}
