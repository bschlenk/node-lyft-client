import Lyft from '..';
import { DriverEtaInput } from '../endpoints/DriverEta';
import { NearbyDriversInput } from '../endpoints/NearbyDrivers';
import { RideEstimatesInput } from '../endpoints/RideEstimates';
import { RideTypesInput } from '../endpoints/RideTypes';
import { RideType } from '../interfaces/RideType';

/* tslint:disable:no-console */

describe('Test Lyft API Node Wrapper', () => {
  const lyft = new Lyft(
    process.env.LYFT_CLIENT_ID!,
    process.env.LYFT_CLIENT_SECRET!,
  );

  const startLat = 33.792858;
  const startLng = -118.021032;
  const endLat = 33.594303;
  const endLng = -117.873806;

  const start = {
    latitude: startLat,
    longitude: startLng,
  };

  const end = {
    latitude: endLat,
    longitude: endLng,
  };

  const rideTypesInput: RideTypesInput = {
    latitude: startLat,
    longitude: startLng,
  };

  const driverEtaInput: DriverEtaInput = {
    latitude: startLat,
    longitude: startLng,
  };

  const rideEstimatesInput: RideEstimatesInput = {
    start: {
      latitude: startLat,
      longitude: startLng,
    },
    end: {
      latitude: endLat,
      longitude: endLng,
    },
    rideType: RideType.LYFT_PLUS,
  };

  const nearbyDriversInput: NearbyDriversInput = {
    latitude: startLat,
    longitude: startLng,
  };

  it('tests ride types fetch', () => {
    return lyft
      .getRideTypes(rideTypesInput)
      .then(response => console.log(response));
  });

  it('tests driver eta fetch', () => {
    return lyft
      .getDriverEta(driverEtaInput)
      .then(response => console.log(response));
  });

  it('tests ride estimates fetch', () => {
    return lyft
      .getRideEstimates(rideEstimatesInput)
      .then(response => console.log(response));
  });

  it('tests nearby drivers fetch', () => {
    return lyft
      .getNearbyDrivers(nearbyDriversInput)
      .then(response => console.log(response));
  });
});
