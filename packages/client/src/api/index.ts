import { fetchFromApi } from "./helper.ts";
import { API_URL } from "../config";
import type { Forecast, QueryParam, TrafficCamera } from "../types";

export const fetchTrafficCameras = async ({
  dateTime,
}: QueryParam): Promise<TrafficCamera[]> => {
  return fetchFromApi(`${API_URL}/traffic`, { dateTime });
};

export const fetchWeatherForecast = async ({
  dateTime,
}: QueryParam): Promise<Forecast[]> => {
  return fetchFromApi(`${API_URL}/weather`, { dateTime });
};
