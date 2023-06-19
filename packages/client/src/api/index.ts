import { fetchFromApi } from "./helper.ts";

type QueryParam = {
  [key: string]: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTrafficCameras = async ({ dateTime }: QueryParam) => {
  return fetchFromApi(`${API_URL}/traffic`, { dateTime });
};

export const fetchWeatherForecast = async ({ dateTime }: QueryParam) => {
  return fetchFromApi(`${API_URL}/weather`, { dateTime });
};
