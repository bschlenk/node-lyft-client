import { RideType } from '../../interfaces/RideType';
import {
  rideEstimates,
  RideEstimatesInput,
  RideEstimatesOutput,
} from '../RideEstimates';

describe('RideEstimates', () => {
  describe('#convertInput()', () => {
    it('should convert client input to api input', () => {
      const input: RideEstimatesInput = {
        start: {
          latitude: 1,
          longitude: 2,
        },
        end: {
          latitude: 3,
          longitude: 4,
        },
        rideType: RideType.LYFT,
      };

      const expected = {
        start_lat: 1,
        start_lng: 2,
        end_lat: 3,
        end_lng: 4,
        ride_type: 'lyft',
      };

      const converted = rideEstimates.convertInput(input);
      expect(converted).toEqual(expected);
    });

    it('should allow omitting end coordinate', () => {
      const input: RideEstimatesInput = {
        start: {
          latitude: 1,
          longitude: 2,
        },
      };

      const expected = {
        start_lat: 1,
        start_lng: 2,
        end_lat: undefined,
        end_lng: undefined,
        ride_type: undefined,
      };

      const converted = rideEstimates.convertInput(input);
      expect(converted).toEqual(expected);
    });
  });

  describe('#convertOutput()', () => {
    it('should extract the cost_estimates field and camelcase', () => {
      const output = {
        cost_estimates: {
          display_name: 'abc',
          estimated_cost_cents_max: 50,
        },
      };

      const expected: Partial<RideEstimatesOutput> = {
        displayName: 'abc',
        estimatedCostCentsMax: 50,
      };

      const converted = rideEstimates.convertOutput(output);
      expect(converted).toEqual(expected);
    });
  });
});
