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
import { type FetchOptions, URLBuilder } from "./utils.js";

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

const trainInfoTypeObj: TrainInfo = {
  id: 0,
  trainNumber: "",
  trainName: "",
  trainFullName: "",
  trainRunningDays: {
    sunday: false,
    monday: false,
    tueday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  },
  availableClasses: [],
  hasPantry: false,
  trainTypeCode: "ANT",
  returnTrainNumber: "",
  stationFrom: {
    id: 0,
    stationCode: "",
    stationName: "",
    stationType: "unknown",
  },
  stationTo: {
    id: 0,
    stationCode: "",
    stationName: "",
    stationType: "unknown",
  },
  departureTime: "00:00:00",
  arrivalTime: "00:00:00",
  durationSec: 0,
  distance: 0,
  avgSpeed: 0,
  numberOfStops: 0,
  isActive: false,
  updatedAt: "",
} as const;

export default class Trains {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.headers = client.headers;
  }

  getTrain(trainNumber: TrainNumber): FetchOptions<TrainInfo> {
    const urlBuilder = new URLBuilder<"trains", TrainInfo>(trainInfoTypeObj, this.baseUrl, this.headers)
      .addResource("trains");
    return urlBuilder.addResource(trainNumber).buildURL();
  }

  getTrainsLikeNumber(
    trainNumber: string,
    limit: number = 10,
  ): FetchOptions<TrainGeneralInfo[]> {
    const urlBuilder = new URLBuilder<"trains", TrainGeneralInfo[]>(
      [],
      this.baseUrl,
      this.headers,
    ).addResource("trains");
    return urlBuilder.addQueryParam({ trainNumber, limit }).buildURL();
  }

  getTrainsLikeQuery(
    q: string,
    limit: number = 10,
  ): FetchOptions<TrainGeneralInfo[]> {
    const urlBuilder = new URLBuilder<"trains", TrainGeneralInfo[]>(
      [],
      this.baseUrl,
      this.headers,
    ).addResource("trains");
    return urlBuilder.addQueryParam({ q, limit }).buildURL();
  }
}
