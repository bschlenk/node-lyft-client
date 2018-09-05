import camelcaseKeys = require('camelcase-keys');
import { Coordinate } from '../interfaces/Coordinate';
import { RideType } from '../interfaces/RideType';
import { Endpoint } from './Endpoint';

export interface RideEstimatesInput {
  start: Coordinate;
  end?: Coordinate;
  rideType?: RideType;
}

export interface RideEstimatesOutput {
  canRequestRide: boolean;
  costToken: string | null;
  currency: string;
  displayName: string;
  estimatedCostCentsMax: number;
  estimatedCostCentsMin: number;
  estimatedDistanceMiles: number;
  estimatedDurationSeconds: number;
  isValidEstimate: boolean;
  priceQuoteId: string;
  primetimeConfirmationToken: string | null;
  primetimePercentage: string;
  rideType: RideType;
}

export const rideEstimates: Endpoint<
  RideEstimatesInput,
  RideEstimatesOutput[]
> = {
  name: 'cost',

  convertInput(input) {
    const { start, end = {} as Partial<Coordinate>, rideType } = input;
    return {
      start_lat: start.latitude,
      start_lng: start.longitude,
      end_lat: end.latitude,
      end_lng: end.longitude,
      ride_type: rideType,
    };
  },

  convertOutput(output) {
    const estimates = output.cost_estimates;
    return camelcaseKeys(estimates, { deep: true });
  },
};
