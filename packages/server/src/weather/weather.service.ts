import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  API_URL = `https://api.data.gov.sg/v1`;

  getForecasts(dateTime) {
    return this.httpService.axiosRef
      .get(
        `${this.API_URL}/environment/2-hour-weather-forecast?date_time=${dateTime}`,
      )
      .then(({ data }) => {
        const areaMetadata = data.area_metadata;
        const weatherForecasts = data.items.find(
          ({ forecasts }) => forecasts,
        ).forecasts;

        return weatherForecasts.map((forecast) => {
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
