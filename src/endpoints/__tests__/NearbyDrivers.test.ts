import {
  nearbyDrivers,
  NearbyDriversInput,
  NearbyDriversOutput,
} from '../NearbyDrivers';

describe('NearbyDrivers', () => {
  describe('#convertInput()', () => {
    it('should convert client input to api input', () => {
      const input: NearbyDriversInput = {
        latitude: 1,
        longitude: 2,
      };

      const expected = {
        lat: 1,
        lng: 2,
      };

      const converted = nearbyDrivers.convertInput(input);
      expect(converted).toEqual(expected);
    });
  });

  describe('#convertOutput()', () => {
    it('should extract the nearby_drivers field and camelcase', () => {
      const output = {
        nearby_drivers: {
          drivers: [
            {
              locations: [
                {
                  lat: 123,
                  lng: 456,
                },
              ],
            },
          ],
        },
      };

      const expected: Partial<NearbyDriversOutput> = {
        drivers: [
          {
            locations: [
              {
                lat: 123,
                lng: 456,
              },
            ],
          },
        ],
      };

      const converted = nearbyDrivers.convertOutput(output);
      expect(converted).toEqual(expected);
    });
  });
});
