import { Client } from "./index.js";
import type { StationCode, StationType, TimeString } from "./types.js";
import { type FetchOptions, URLBuilder } from "./utils.js";

export type StationInfo = {
  id: number;
  stationCode: StationCode;
  stationName: string;
  stateName: string;
  zoneCode: string;
  stationAlternateText: string;
  stationType: StationType;
  numberOfPlatforms: number;
  hindiStationName: string;
  latitude?: number;
  longitude?: number;
  updatedAt: TimeString;
};

export type StationGeneralInfo = {
  id: number;
  stationCode: StationCode;
  stationName: string;
  stationType: StationType;
};

const stationInfoTypeObj: StationInfo = {
  id: 0,
  stationCode: "",
  stationName: "",
  stateName: "",
  zoneCode: "",
  stationAlternateText: "",
  stationType: "unknown",
  numberOfPlatforms: 0,
  hindiStationName: "",
  updatedAt: "",
} as const;

export default class Stations {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.headers = client.headers;
  }

  getStation(stationCode: StationCode): FetchOptions<StationInfo> {
    const stationUrlBuilder = new URLBuilder<"stations", StationInfo>(stationInfoTypeObj, this.baseUrl, this.headers)
      .addResource(
        "stations",
      );
    return stationUrlBuilder.addResource(stationCode).buildURL();
  }

  getStationsLikeCode(
    stationCode: StationCode,
    limit: number = 10,
  ): FetchOptions<StationGeneralInfo[]> {
    const stationGeneralUrlBuilder = new URLBuilder<"stations", StationGeneralInfo[]>([], this.baseUrl, this.headers)
      .addResource(
        "stations",
      );

    return stationGeneralUrlBuilder.addQueryParam({ stationCode, limit }).buildURL();
  }

  getStationsLikeQuery(
    q: string,
    limit: number = 10,
  ): FetchOptions<StationGeneralInfo[]> {
    const stationGeneralUrlBuilder = new URLBuilder<"stations", StationGeneralInfo[]>([], this.baseUrl, this.headers)
      .addResource(
        "stations",
      );
    return stationGeneralUrlBuilder.addQueryParam({ q, limit }).buildURL();
  }
}
