import { Client } from "./index.js";
import type {
  DateString,
  StationCode,
  StationGeneralInfo,
  TimeString,
  TrainClassTypeXX,
  TrainNumber,
  TrainRunsOnDays,
  TrainTime,
} from "./types.js";
import { type FetchOptions, URLBuilder } from "./utils.js";

type ScheduleStation = {
  srNo: string;
  stationId: number;
  arrivalTime: TrainTime;
  departureTime: TrainTime;
  haltTimeSec: number;
  platform: string;
  dayCount: number;
  distance: number;
  speed: number;
  boardingDisabled: boolean;
  updatedAt: TimeString;
};

export type TrainsBetweenStations = {
  stations: StationGeneralInfo[];
  date: DateString;
  flexible: boolean;
  trainsOnDate: TrainsBetweenStationsTrains[];
  trainsOnAlternateDate: TrainsBetweenStationsTrains[];
};

export type TrainsBetweenStationsTrains = {
  trainId: number;
  trainNumber: TrainNumber;
  trainName: string;
  trainFullName: string;
  trainRunningDays: TrainRunsOnDays;
  availableClasses: TrainClassTypeXX[];
  hasPantry: boolean;
  trainTypeCode: string;
  returnTrainNumber: string;
  distance: number;
  durationSec: number;
  stationFrom: ScheduleStation;
  stationTo: ScheduleStation;
  updatedAt: TimeString;
};

export default class TrainsBtwStations {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.headers = client.headers;
  }

  getTrainsBtwStations(
    fromStation: StationCode,
    toStation: StationCode,
    options: { allTrains?: boolean; date?: string; flexible?: boolean } = {},
  ): FetchOptions<TrainsBetweenStations[]> {
    options.allTrains ??= false;
    options.flexible ??= false;
    // TODO: better date formate
    options.date ??= (new Date()).toDateString().slice(0, 10);

    const urlBuilder = new URLBuilder<"trainsBtwStations", TrainsBetweenStations[]>([], this.baseUrl, this.headers)
      .addResource(
        "trainsBtwStations",
      );
    return urlBuilder.addQueryParam({
      fromStation,
      toStation,
      date: options.date,
      allTrains: options.allTrains,
      flexible: options.flexible,
    })
      .buildURL();
  }
}
