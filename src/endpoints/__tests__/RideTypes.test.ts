import { rideTypes, RideTypesInput } from '../RideTypes';

describe('RideTypes', () => {
  describe('#convertInput()', () => {
    it('should convert client input to api input', () => {
      const input: RideTypesInput = {
        latitude: 1,
        longitude: 2,
      };

      const expected = {
        lat: 1,
        lng: 2,
      };

      const converted = rideTypes.convertInput(input);
      expect(converted).toEqual(expected);
    });
  });

  describe('#convertOutput()', () => {
    it('should extract the ride_types field and camelcase', () => {
      const output = {
        ride_types: {
          display_name: 'abc',
          pricing_details: {
            base_charge: 5,
          },
        },
      };

      const expected = {
        displayName: 'abc',
        pricingDetails: {
          baseCharge: 5,
        },
      };

      const converted = rideTypes.convertOutput(output);
      expect(converted).toEqual(expected);
    });
  });
});
