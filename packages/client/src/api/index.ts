import { fetchFromApi } from "./helper.ts";

import type { Forecast, TrafficCamera } from "../types";

type QueryParam = {
  [key: string]: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTrafficCameras = async ({
  dateTime,
}: QueryParam): Promise<TrafficCamera[] | undefined> => {
  try {
    return (
      fetch(`${API_URL}/traffic?dateTime=${dateTime}`).then((res) =>
        res.json()
      ) || []
    );
  } catch (e) {
    console.error(e);
  }
};

export const fetchWeatherForecast = async ({
  dateTime,
}: QueryParam): Promise<Forecast[] | undefined> => {
  try {
    return (
      fetch(`${API_URL}/weather?dateTime=${dateTime}`).then((res) =>
        res.json()
      ) || []
    );
  } catch (e) {
    console.error(e);
  }
};
