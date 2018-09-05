import { driverEta, DriverEtaInput, DriverEtaOutput } from '../DriverEta';

describe('DriverEta', () => {
  describe('#convertInput()', () => {
    it('should convert client input to api input', () => {
      const input: DriverEtaInput = {
        latitude: 1,
        longitude: 2,
      };

      const expected = {
        lat: 1,
        lng: 2,
        ride_type: undefined,
      };

      const converted = driverEta.convertInput(input);
      expect(converted).toEqual(expected);
    });
  });

  describe('#convertOutput()', () => {
    it('should extract the eta_estimates field and camelcase', () => {
      const output = {
        eta_estimates: {
          display_name: 'abc',
          eta_seconds: 123,
        },
      };

      const expected: Partial<DriverEtaOutput> = {
        displayName: 'abc',
        etaSeconds: 123,
      };

      const converted = driverEta.convertOutput(output);
      expect(converted).toEqual(expected);
    });
  });
});
