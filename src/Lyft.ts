import * as request from 'request-promise-native';

import { driverEta, DriverEtaInput } from './endpoints/DriverEta';
import { Endpoint } from './endpoints/Endpoint';
import { nearbyDrivers, NearbyDriversInput } from './endpoints/NearbyDrivers';
import { rideEstimates, RideEstimatesInput } from './endpoints/RideEstimates';
import { rideTypes, RideTypesInput } from './endpoints/RideTypes';
import { AuthResponse } from './interfaces/AuthResponse';

export class Lyft {
  private tokenType: string;
  private accessToken: string;
  private expirationDate: number;

  constructor(
    public readonly clientId: string,
    public readonly clientSecret: string,
  ) {
    this.tokenType = '';
    this.accessToken = '';
    this.expirationDate = 0;
  }

  public getRideTypes(input: RideTypesInput) {
    return this.execute(rideTypes, input);
  }

  public getDriverEta(input: DriverEtaInput) {
    return this.execute(driverEta, input);
  }

  public getRideEstimates(input: RideEstimatesInput) {
    return this.execute(rideEstimates, input);
  }

  public getNearbyDrivers(input: NearbyDriversInput) {
    return this.execute(nearbyDrivers, input);
  }

  private async execute<Input, Output>(
    endpoint: Endpoint<Input, Output>,
    input: Input,
  ): Promise<Output> {
    const params = endpoint.convertInput(input);
    const options = await this.buildOptions(endpoint.name, params);
    const output = await request(options);
    return endpoint.convertOutput(output);
  }

  private getAccessToken() {
    return request({
      uri: 'https://api.lyft.com/oauth/token',
      method: 'POST',
      auth: {
        username: this.clientId,
        password: this.clientSecret,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        grant_type: 'client_credentials',
      },
      json: true,
      timeout: 5000,
    }).then((result: AuthResponse) => {
      this.tokenType = result.token_type;
      this.accessToken = result.access_token;
      this.expirationDate = Date.now() + result.expires_in * 1000;

      return result;
    });
  }

  private requiresTokenRefresh(): boolean {
    const nowDate = Date.now();

    return (
      !this.tokenType ||
      !this.accessToken ||
      !this.expirationDate ||
      nowDate > this.expirationDate
    );
  }

  private async buildOptions(
    subpath: string,
    parameters: any,
  ): Promise<request.OptionsWithUri> {
    if (this.requiresTokenRefresh()) {
      await this.getAccessToken();
    }

    return {
      uri: `https://api.lyft.com/v1/${subpath}`,
      qs: parameters,
      headers: {
        Authorization: `${this.tokenType} ${this.accessToken}`,
      },
      json: true,
      timeout: 10000,
    };
  }
}
