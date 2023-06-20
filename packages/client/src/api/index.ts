import { fetchFromApi } from "./helper.ts";
import { API_URL } from "../config";

type QueryParam = {
  [key: string]: string;
};

export const fetchTrafficCameras = async ({ dateTime }: QueryParam) => {
  return fetchFromApi(`${API_URL}/traffic`, { dateTime });
};

export const fetchWeatherForecast = async ({ dateTime }: QueryParam) => {
  return fetchFromApi(`${API_URL}/weather`, { dateTime });
};
