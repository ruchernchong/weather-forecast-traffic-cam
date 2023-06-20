import Skeleton from "react-loading-skeleton";
import Card from "./Card.tsx";
import type { Forecast } from "../types";

type WeatherForecastProps = {
  forecasts: Forecast[];
};

const WeatherSection = ({ forecasts }: WeatherForecastProps) => {
  return (
    <section className="flex flex-col gap-4 md:basis-1/3">
      <div className="prose">
        <h2>Weather Forecast</h2>
      </div>
      <div className="relative flex max-h-[75vh] flex-col gap-y-2 overflow-auto rounded-lg border-b">
        {forecasts?.length === 0 && <Card>No weather forecast!</Card>}
        {forecasts ? (
          <>
            {forecasts.map(({ area, forecast }) => {
              return (
                <Card key={area}>
                  <h3>{area}</h3>
                  <p>{forecast}</p>
                </Card>
              );
            })}
            <div className="sticky bottom-0 flex w-full justify-center rounded-b-lg border bg-neutral-50 p-4">
              Scroll for more
            </div>
          </>
        ) : (
          <Skeleton height="75vh" />
        )}
      </div>
    </section>
  );
};

export default WeatherSection;
