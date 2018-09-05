import camelcaseKeys = require('camelcase-keys');
import { Coordinate } from '../interfaces/Coordinate';
import { RideType } from '../interfaces/RideType';
import { Endpoint } from './Endpoint';

export type NearbyDriversInput = Coordinate;

export interface NearbyDriversOutput {
  drivers: {
    locations: {
      lat: number;
      lng: number;
    }[];
  }[];
  rideType: RideType;
}

export const nearbyDrivers: Endpoint<
  NearbyDriversInput,
  NearbyDriversOutput[]
> = {
  name: 'drivers',

  convertInput(input) {
    const { latitude, longitude } = input;
    return {
      lat: latitude,
      lng: longitude,
    };
  },

  convertOutput(output) {
    const drivers = output.nearby_drivers;
    return camelcaseKeys(drivers, { deep: true });
  },
};
