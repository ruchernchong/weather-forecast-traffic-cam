import { fetchFromApi } from "./helper.ts";
import { API_URL } from "../config";
import type { Forecast, QueryParam, TrafficCamera } from "../types";

export const fetchTrafficCameras = ({
  dateTime,
}: QueryParam): Promise<TrafficCamera[]> =>
  fetchFromApi(`${API_URL}/traffic`, { dateTime });

export const fetchWeatherForecast = ({
  dateTime,
}: QueryParam): Promise<Forecast[]> =>
  fetchFromApi(`${API_URL}/weather`, { dateTime });
