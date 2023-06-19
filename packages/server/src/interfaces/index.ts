interface ImageMetadata {
  width: number;
  height: number;
  md5: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface TrafficCamera {
  camera_id: string;
  formattedAddress: string;
  image: string;
  image_metadata: ImageMetadata;
  location: Location;
  timestamp: string;
}

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
