import { ChangeEvent, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import debounce from "lodash/debounce";
import { fetchTrafficCameras, fetchWeatherForecast } from "./api";
import Layout from "./components/Layout.tsx";
import TrafficSection from "./components/TrafficSection.tsx";
import WeatherSection from "./components/WeatherSection.tsx";
import { DEBOUNCE_WAIT_DURATION } from "./config";

import type { Forecast, TrafficCamera } from "./types";

import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  const dateNow = dayjs().format("YYYY-MM-DD");
  const timeNow = dayjs().format("HH:mm");

  const [dateTime, setDateTime] = useState<{ date: string; time: string }>({
    date: dateNow,
    time: timeNow,
  });
  const [trafficCameras, setTrafficCameras] = useState<TrafficCamera[]>([]);
  const [weatherForecasts, setWeatherForecasts] = useState<Forecast[]>();
  const [selectedTrafficCamera, setSelectedTrafficCamera] =
    useState<TrafficCamera>();

  useEffect(() => {
    const formattedDateTime = dayjs(
      `${dateTime?.date} ${dateTime?.time}`
    ).format("YYYY-MM-DDTHH:mm:ss");

    fetchTrafficCameras({ dateTime: formattedDateTime }).then((cameras) => {
      if (cameras) {
        setTrafficCameras(cameras);
      }
    });

    fetchWeatherForecast({
      dateTime: formattedDateTime,
    }).then((weatherForecast) => {
      setWeatherForecasts(weatherForecast);
    });
  }, [dateTime?.date, dateTime?.time]);

  useEffect(() => {
    if (!selectedTrafficCamera) {
      setSelectedTrafficCamera(trafficCameras[0]);
    }
  }, [selectedTrafficCamera, trafficCameras]);

  const handleLocationChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedTrafficCamera = trafficCameras?.find(
        ({ formattedAddress }) => formattedAddress === e.target.value
      );
      setSelectedTrafficCamera(selectedTrafficCamera);
    },
    [trafficCameras]
  );

  const handleDateTimeChange = debounce((value) => {
    setDateTime((prevState) => ({
      ...prevState,
      ...value,
    }));
  }, DEBOUNCE_WAIT_DURATION);

  useEffect(() => {
    let updatedTrafficCamera;

    if (selectedTrafficCamera) {
      updatedTrafficCamera = trafficCameras.find(
        ({ formattedAddress }) =>
          formattedAddress === selectedTrafficCamera.formattedAddress
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
