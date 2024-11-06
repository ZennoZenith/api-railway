import { Client } from "./index.js";
import type { ApiError, ApiResponse, StationCode, StationType, TimeString } from "./types.js";
import { catchError, URLBuilder } from "./utils.js";

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

export default class Stations {
  readonly #client: Client;
  private readonly baseUrl: string;
  private readonly urlBuilder: URLBuilder<"stations">;

  constructor(client: Client) {
    this.#client = client;
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.urlBuilder = new URLBuilder<"stations">(this.baseUrl).addResource("stations");
  }

  async getStation(stationCode: StationCode): Promise<ApiResponse<StationInfo>> {
    let response = await catchError(
      this.urlBuilder.addResource(stationCode).fetch({
        headers: {
          "x-api-key": this.#client.apiKey,
        },
        method: "GET",
      }),
    );

    if (response[0]) {
      return { error: response[0], data: undefined };
    }

    let data = await catchError<StationInfo | ApiError>(response[1].json());

    if (data[0]) {
      return { error: data[0], data: undefined };
    }

    if ((data[1] as ApiError).error) {
      return { apiError: response[0], data: undefined };
    }
    return { data: data[1] as StationInfo, apiError: undefined, error: undefined };
  }

  async getStationsLikeCode(
    stationCode: StationCode,
    limit: number = 10,
  ): Promise<ApiResponse<StationGeneralInfo>> {
    let response = await catchError(
      this.urlBuilder.addQueryParam({ stationCode, limit }).fetch({
        headers: {
          "x-api-key": this.#client.apiKey,
        },
        method: "GET",
      }),
    );

    if (response[0]) {
      return { error: response[0], data: undefined };
    }

    const data = await catchError<StationGeneralInfo | ApiError>(response[1].json());
    if (data[0]) {
      return { error: data[0], data: undefined };
    }

    if ((data[1] as ApiError).error) {
      return { apiError: data[0], data: undefined };
    }

    return { data: data[1] as StationGeneralInfo, apiError: undefined, error: undefined };
  }

  async getStationsLikeQuery(
    q: string,
    limit: number = 10,
  ): Promise<ApiResponse<StationGeneralInfo>> {
    let response = await catchError(
      this.urlBuilder.addQueryParam({ q, limit }).fetch({
        headers: {
          "x-api-key": this.#client.apiKey,
        },
        method: "GET",
      }),
    );

    if (response[0]) {
      return { error: response[0], data: undefined };
    }

    const data = await catchError<StationGeneralInfo | ApiError>(response[1].json());
    if (data[0]) {
      return { error: data[0], data: undefined };
    }

    if ((data[1] as ApiError).error) {
      return { apiError: data[0], data: undefined };
    }

    return { data: data[1] as StationGeneralInfo, apiError: undefined, error: undefined };
  }
}
