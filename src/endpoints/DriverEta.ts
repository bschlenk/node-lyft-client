import camelcaseKeys = require('camelcase-keys');
import { Coordinate } from '../interfaces/Coordinate';
import { RideType } from '../interfaces/RideType';
import { Endpoint } from './Endpoint';

export interface DriverEtaInput extends Coordinate {
  rideType?: RideType;
}

export interface DriverEtaOutput {
  displayName: string;
  etaSeconds: number;
  isValidEstimate: boolean;
  rideType: RideType;
}

export const driverEta: Endpoint<DriverEtaInput, DriverEtaOutput[]> = {
  name: 'eta',

  convertInput(input) {
    const { latitude, longitude, rideType } = input;
    return {
      lat: latitude,
      lng: longitude,
      ride_type: rideType,
    };
  },

  convertOutput(output) {
    const estimates = output.eta_estimates;
    return camelcaseKeys(estimates, { deep: true });
  },
};
