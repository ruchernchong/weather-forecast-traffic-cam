export interface ImageMetadata {
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

export interface Forecast {
  area: string;
  forecast: string;
}

export interface DateTime {
  date: string;
  time: string;
}

export type QueryParam = Record<string, string>;
