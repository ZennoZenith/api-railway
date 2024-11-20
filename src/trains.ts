import { Client } from "./index.js";
import type {
  StationCode,
  StationType,
  TimeString,
  TrainClassTypeXX,
  TrainNumber,
  TrainRunsOnDays,
  TrainTime,
  TrainTypeCode,
} from "./types.js";
import { URLBuilder } from "./utils.js";

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
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.headers = client.headers;
  }

  getTrain(trainNumber: TrainNumber) {
    const urlBuilder = new URLBuilder<"trains", TrainInfo>(this.baseUrl, this.headers)
      .addResource("trains");
    return urlBuilder.addResource(trainNumber).buildURL();
  }

  getTrainsLikeNumber(
    trainNumber: string,
    limit: number = 10,
  ) {
    const urlBuilder = new URLBuilder<"trains", TrainGeneralInfo[]>(
      this.baseUrl,
      this.headers,
    ).addResource("trains");
    return urlBuilder.addQueryParam({ trainNumber, limit }).buildURL();
  }

  getTrainsLikeQuery(
    q: string,
    limit: number = 10,
  ) {
    const urlBuilder = new URLBuilder<"trains", TrainGeneralInfo[]>(
      this.baseUrl,
      this.headers,
    ).addResource("trains");
    return urlBuilder.addQueryParam({ q, limit }).buildURL();
  }
}
