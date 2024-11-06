import { Client } from "./index.js";
import type {
  ApiError,
  ApiResponse,
  StationCode,
  StationType,
  TimeString,
  TrainClassTypeXX,
  TrainNumber,
  TrainRunsOnDays,
  TrainTime,
  TrainTypeCode,
} from "./types.js";
import { catchError, URLBuilder } from "./utils.js";

export type TrainInfo = {
  id: number;
  trainNumber: string;
  trainName: string;
  trainFullName: string;
  trainRunningDays: TrainRunsOnDays;
  availableClasses: TrainClassTypeXX[];
  hasPantry: boolean;
  trainTypeCode: TrainTypeCode;
  returnTrainNumber: string;
  stationFrom: {
    id: number;
    stationCode: StationCode;
    stationName: string;
    stationType: StationType;
  };
  stationTo: {
    id: number;
    stationCode: StationCode;
    stationName: string;
    stationType: StationType;
  };
  departureTime: TrainTime;
  arrivalTime: TrainTime;
  durationSec: number;
  distance: number;
  avgSpeed: number;
  numberOfStops: number;
  isActive: boolean;
  updatedAt: TimeString;
};

export type TrainGeneralInfo = {
  id: number;
  trainNumber: string;
  trainName: string;
  trainTypeCode: TrainTypeCode;
};

export default class Trains {
  readonly #client: Client;
  private readonly baseUrl: string;
  private readonly urlBuilder: URLBuilder<"trains">;

  constructor(client: Client) {
    this.#client = client;
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.urlBuilder = new URLBuilder<"trains">(this.baseUrl).addResource("trains");
  }

  async getTrain(trainNumber: TrainNumber): Promise<ApiResponse<TrainInfo>> {
    let response = await catchError(
      this.urlBuilder.addResource(trainNumber).fetch({
        headers: {
          "x-api-key": this.#client.apiKey,
        },
        method: "GET",
      }),
    );

    if (response[0]) {
      return { error: response[0], data: undefined };
    }

    let data = await catchError<TrainInfo | ApiError>(response[1].json());

    if (data[0]) {
      return { error: data[0], data: undefined };
    }

    if ((data[1] as ApiError).error) {
      return { apiError: response[0], data: undefined };
    }
    return { data: data[1] as TrainInfo, apiError: undefined, error: undefined };
  }

  async getTrainsLikeNumber(
    trainNumber: string,
    limit: number = 10,
  ): Promise<ApiResponse<TrainGeneralInfo>> {
    let response = await catchError(
      this.urlBuilder.addQueryParam({ trainNumber, limit }).fetch({
        headers: {
          "x-api-key": this.#client.apiKey,
        },
        method: "GET",
      }),
    );

    if (response[0]) {
      return { error: response[0], data: undefined };
    }

    const data = await catchError<TrainGeneralInfo | ApiError>(response[1].json());
    if (data[0]) {
      return { error: data[0], data: undefined };
    }

    if ((data[1] as ApiError).error) {
      return { apiError: data[0], data: undefined };
    }

    return { data: data[1] as TrainGeneralInfo, apiError: undefined, error: undefined };
  }

  async getTrainsLikeQuery(
    q: string,
    limit: number = 10,
  ): Promise<ApiResponse<TrainGeneralInfo>> {
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

    const data = await catchError<TrainGeneralInfo | ApiError>(response[1].json());
    if (data[0]) {
      return { error: data[0], data: undefined };
    }

    if ((data[1] as ApiError).error) {
      return { apiError: data[0], data: undefined };
    }

    return { data: data[1] as TrainGeneralInfo, apiError: undefined, error: undefined };
  }
}
