import { TrafficCamera } from '../interfaces';

export const filterByUniqueLocation = (locations: TrafficCamera[]) => [
  ...new Map(
    locations.map((location) => [location['formattedAddress'], location]),
  ).values(),
];

export const sortFormattedAddress = (a: TrafficCamera, b: TrafficCamera) => {
  const addressA = a.formattedAddress.toUpperCase();
  const addressB = b.formattedAddress.toUpperCase();

  return addressA.localeCompare(addressB);
};
