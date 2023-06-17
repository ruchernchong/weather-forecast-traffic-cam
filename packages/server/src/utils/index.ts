export const filterByUniqueLocation = (locations) => [
  ...new Map(
    locations.map((location) => [location['formattedAddress'], location]),
  ).values(),
];

export const sortFormattedAddress = (a, b) => {
  const addressA = a.formattedAddress.toUpperCase();
  const addressB = b.formattedAddress.toUpperCase();

  return addressA.localeCompare(addressB);
};
