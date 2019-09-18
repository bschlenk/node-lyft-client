import { Coordinate } from '../interfaces/Coordinate';
import { RideType } from '../interfaces/RideType';
import { camelcaseKeys } from '../utils';
import { Endpoint } from './Endpoint';

export type RideTypesInput = Coordinate;

export interface RideTypesOutput {
  categoryKey: string;
  displayName: string;
  imageUrl: string;
  pricingDetails: {
    baseCharge: number;
    cancelPenaltyAmount: number;
    costMinimum: number;
    costPerMile: number;
    costPerMinute: number;
    currency: string;
    serviceFeeDescription: string;
    trustAndService: number;
  };
  rideType: RideType;
  seats: number;
}

export const rideTypes: Endpoint<RideTypesInput, RideTypesOutput[]> = {
  name: 'ridetypes',

  convertInput(input) {
    const { latitude, longitude } = input;
    return {
      lat: latitude,
      lng: longitude,
    };
  },

  convertOutput(output) {
    const rides = output.ride_types;
    return camelcaseKeys(rides);
  },
};
