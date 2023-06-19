import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { Weather, WeatherResponse } from '../interfaces';
import { DATA_GOV_SG_API_URL } from '../config';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  getForecasts(dateTime: string): Promise<Weather[]> {
    return this.httpService.axiosRef
      .get(
        `${DATA_GOV_SG_API_URL}/environment/2-hour-weather-forecast?date_time=${dateTime}`,
      )
      .then(({ data }: AxiosResponse<WeatherResponse>) => {
        const areaMetadata = data.area_metadata;
        const forecasts = data.items.find(
          ({ forecasts }) => forecasts,
        ).forecasts;

        return forecasts.map((forecast) => {
          const { label_location } = areaMetadata.find(
            (metadata) => forecast.area === metadata.name,
          );

          return {
            ...forecast,
            location: label_location,
          };
        });
      });
  }
}
