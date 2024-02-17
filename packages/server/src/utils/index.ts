import { TrafficCamera } from '../interfaces';
import { format } from 'date-fns';

export const filterByUniqueLocation = (locations: TrafficCamera[]) =>
  [
    ...new Map(
      locations.map((location) => [location['formattedAddress'], location]),
    ).values(),
  ].filter(({ formattedAddress }) => formattedAddress);

export const sortFormattedAddress = (a: TrafficCamera, b: TrafficCamera) => {
  const addressA = a.formattedAddress?.toUpperCase();
  const addressB = b.formattedAddress?.toUpperCase();

  return addressA.localeCompare(addressB);
};

export const formatDateToISOString = (date: Date) =>
  format(date, "yyyy-MM-dd'T'HH:mm:ss");
