import axios from 'axios';
import { driverEta, DriverEtaInput } from './endpoints/DriverEta';
import { Endpoint } from './endpoints/Endpoint';
import { nearbyDrivers, NearbyDriversInput } from './endpoints/NearbyDrivers';
import { rideEstimates, RideEstimatesInput } from './endpoints/RideEstimates';
import { rideTypes, RideTypesInput } from './endpoints/RideTypes';
import { AuthResponse } from './interfaces/AuthResponse';

const client = axios.create({
  baseURL: 'https://api.lyft.com/v1/',
  timeout: 1000,
  headers: {
    'content-type': 'application/json',
  },
});

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
    if (this.requiresTokenRefresh()) {
      await this.getAccessToken();
    }

    const params = endpoint.convertInput(input);

    const output = await client({
      url: endpoint.name,
      method: 'POST',
      params,
      headers: {
        authorization: `${this.tokenType} ${this.accessToken}`,
      },
    });

    return endpoint.convertOutput(output);
  }

  private getAccessToken() {
    return client({
      url: 'https://api.lyft.com/oauth/token',
      method: 'POST',
      auth: {
        username: this.clientId,
        password: this.clientSecret,
      },
      data: {
        grant_type: 'client_credentials',
      },
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
}
