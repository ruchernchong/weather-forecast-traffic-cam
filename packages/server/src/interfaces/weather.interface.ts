import { Location } from './traffic.interface';

export interface Weather {
  area: string;
  forecast: string;
  location: Location;
}

interface Metadata {
  name: string;
  label_location: Location;
}

export interface WeatherResponse {
  area_metadata: Metadata[];
  items: {
    forecasts: Pick<Weather, 'area' | 'forecast'>[];
  }[];
}
