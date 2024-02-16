import { ChangeEvent, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import debounce from "lodash/debounce";
import { fetchTrafficCameras, fetchWeatherForecast } from "./api";
import Layout from "./components/Layout.tsx";
import TrafficSection from "./components/TrafficSection.tsx";
import WeatherSection from "./components/WeatherSection.tsx";

import { DEBOUNCE_WAIT_DURATION } from "./config";

import type { DateTime, Forecast, TrafficCamera } from "./types";

const App = () => {
  const dateNow = dayjs().format("YYYY-MM-DD");
  const timeNow = dayjs().format("HH:mm");

  const [dateTime, setDateTime] = useState<DateTime>({
    date: dateNow,
    time: timeNow,
  });
  const [trafficCameras, setTrafficCameras] = useState<TrafficCamera[]>([]);
  const [weatherForecasts, setWeatherForecasts] = useState<Forecast[]>([]);
  const [selectedTrafficCamera, setSelectedTrafficCamera] =
    useState<TrafficCamera>();

  useEffect(() => {
    const formattedDateTime = dayjs(
      `${dateTime?.date} ${dateTime?.time}`,
    ).format("YYYY-MM-DDTHH:mm:ss");

    fetchTrafficCameras({
      dateTime: formattedDateTime,
    }).then((cameras: TrafficCamera[]) => {
      setTrafficCameras(cameras);
    });

    fetchWeatherForecast({
      dateTime: formattedDateTime,
    }).then((weatherForecast: Forecast[]) => {
      setWeatherForecasts(weatherForecast);
    });
  }, [dateTime?.date, dateTime?.time]);

  useEffect(() => {
    if (!selectedTrafficCamera && trafficCameras.length > 0) {
      setSelectedTrafficCamera(trafficCameras[0]);
    }
  }, [selectedTrafficCamera, trafficCameras]);

  const handleLocationChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedTrafficCamera = trafficCameras.find(
        ({ formattedAddress }) => formattedAddress === e.target.value,
      );
      setSelectedTrafficCamera(selectedTrafficCamera);
    },
    [trafficCameras],
  );

  const handleDateTimeChange = debounce(
    (dateTime: { date: string } | { time: string }) => {
      setDateTime((prevState) => ({
        ...prevState,
        ...dateTime,
      }));
    },
    DEBOUNCE_WAIT_DURATION,
  );

  useEffect(() => {
    let updatedTrafficCamera: TrafficCamera | undefined;

    if (selectedTrafficCamera) {
      updatedTrafficCamera = trafficCameras.find(
        ({ formattedAddress }: Pick<TrafficCamera, "formattedAddress">) =>
          formattedAddress === selectedTrafficCamera.formattedAddress,
      );
    }

    if (updatedTrafficCamera) {
      setSelectedTrafficCamera(updatedTrafficCamera);
    }
  }, [selectedTrafficCamera, trafficCameras]);

  return (
    <Layout>
      <TrafficSection
        dateNow={dateNow}
        timeNow={timeNow}
        handleDateTimeChange={handleDateTimeChange}
        handleLocationChange={handleLocationChange}
        trafficCameras={trafficCameras}
        selectedTrafficCamera={selectedTrafficCamera}
      />
      <WeatherSection forecasts={weatherForecasts} />
    </Layout>
  );
};

export default App;
