export type ImageMetadata = {
  width: number;
  height: number;
  md5: string;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type TrafficCamera = {
  camera_id: string;
  formattedAddress: string;
  image: string;
  image_metadata: ImageMetadata;
  location: Location;
  timestamp: string;
};

export type Forecast = {
  area: string;
  forecast: string;
};

export type DateTime = {
  date: string;
  time: string;
};

export type QueryParam = Record<string, string>;
