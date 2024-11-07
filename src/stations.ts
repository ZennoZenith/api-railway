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
  private readonly stationUrlBuilder: URLBuilder<"stations", StationInfo>;
  private readonly stationGeneralUrlBuilder: URLBuilder<"stations", StationGeneralInfo[]>;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;

    this.stationUrlBuilder = new URLBuilder<"stations", StationInfo>(stationInfoTypeObj, this.baseUrl).addResource(
      "stations",
    );

    this.stationGeneralUrlBuilder = new URLBuilder<"stations", StationGeneralInfo[]>([], this.baseUrl)
      .addResource(
        "stations",
      );
  }

  getStation(stationCode: StationCode): FetchOptions<StationInfo> {
    return this.stationUrlBuilder.addResource(stationCode).buildURL();
  }

  getStationsLikeCode(
    stationCode: StationCode,
    limit: number = 10,
  ): FetchOptions<StationGeneralInfo[]> {
    return this.stationGeneralUrlBuilder.addQueryParam({ stationCode, limit }).buildURL();
  }

  getStationsLikeQuery(
    q: string,
    limit: number = 10,
  ): FetchOptions<StationGeneralInfo[]> {
    return this.stationGeneralUrlBuilder.addQueryParam({ q, limit }).buildURL();
  }
}
