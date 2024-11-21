import { Client } from "./index.js";
import type { StationCode, StationGeneralInfo, StationInfo } from "./types.js";
import { URLBuilder } from "./utils.js";

export default class Stations {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.headers = client.headers;
  }

  getStation(stationCode: StationCode) {
    const stationUrlBuilder = new URLBuilder<"stations", StationInfo>(this.baseUrl, this.headers)
      .addResource(
        "stations",
      );
    return stationUrlBuilder.addResource(stationCode).buildURL();
  }

  getStationsLikeCode(
    stationCode: StationCode,
    limit: number = 10,
  ) {
    const stationGeneralUrlBuilder = new URLBuilder<"stations", StationGeneralInfo[]>(this.baseUrl, this.headers)
      .addResource(
        "stations",
      );

    return stationGeneralUrlBuilder.addQueryParam({ stationCode, limit }).buildURL();
  }

  getStationsLikeQuery(
    q: string,
    limit: number = 10,
  ) {
    const stationGeneralUrlBuilder = new URLBuilder<"stations", StationGeneralInfo[]>(this.baseUrl, this.headers)
      .addResource(
        "stations",
      );
    return stationGeneralUrlBuilder.addQueryParam({ q, limit }).buildURL();
  }
}
