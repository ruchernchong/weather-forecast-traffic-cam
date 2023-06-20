# Weather Forecast & Traffic Cam

## Installation
`pnpm` is required for this.

### Install `pnpm`
```shell
# For Node >16
corepack enable
corepack prepare pnpm@<version> --activate

# For Node <16
npm install -g pnpm
```
### Install packages
```shell
# Install the packages
pnpm install

```

## Usage
### Update environment variables
Copy the `.env.example` to `.env` and add the respective API keys

```shell
cd packages/client/
cp .env.example .env
```

### Starting the environment
```shell
# Start both the server and client
pnpm start
```

## Resources
- [Data.gov.sg](https://data.gov.sg)
  - [Traffic Images](https://data.gov.sg/dataset/traffic-images)
  - [Weather Forecast](https://data.gov.sg/dataset/weather-forecast)
- [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview)
