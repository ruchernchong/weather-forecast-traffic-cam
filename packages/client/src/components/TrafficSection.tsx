import { ChangeEvent } from "react";
import TrafficImage from "./TrafficImage.tsx";
import type { TrafficCamera } from "../types";
import Skeleton from "react-loading-skeleton";

type TrafficSectionProps = {
  dateNow: string;
  timeNow: string;
  handleDateTimeChange: (e: { date: string } | { time: string }) => void;
  handleLocationChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  trafficCameras: TrafficCamera[];
  selectedTrafficCamera?: TrafficCamera;
};

const TrafficSection = ({
  dateNow,
  timeNow,
  handleDateTimeChange,
  handleLocationChange,
  trafficCameras,
  selectedTrafficCamera,
}: TrafficSectionProps) => {
  return (
    <section className="flex flex-col gap-4 md:basis-2/3">
      <div className="prose">
        <h2>Traffic Cam</h2>
      </div>
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-12 md:col-span-6">
          <input
            type="date"
            defaultValue={dateNow}
            max={dateNow}
            className="w-full rounded-lg shadow-md"
            onChange={(e) => handleDateTimeChange({ date: e.target.value })}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <input
            type="time"
            defaultValue={timeNow}
            max={timeNow}
            step={900}
            className="w-full rounded-lg shadow-md"
            onChange={(e) => handleDateTimeChange({ time: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <select
            name="locations"
            id="locations"
            className="w-full cursor-pointer rounded-lg shadow-md"
            onChange={handleLocationChange}
          >
            {trafficCameras?.map(({ formattedAddress }) => {
              return (
                <option key={formattedAddress} value={formattedAddress}>
                  {formattedAddress}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          {selectedTrafficCamera ? (
            <TrafficImage camera={selectedTrafficCamera} />
          ) : (
            <Skeleton height={360} className="rounded-xl shadow-md" />
          )}
        </div>
      </div>
    </section>
  );
};

export default TrafficSection;
