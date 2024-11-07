import { Client } from "./index.js";
import type {
  StationCode,
  StationType,
  TimeString,
  TrainClassTypeXX,
  TrainNumber,
  TrainRunsOnDays,
  TrainTime,
} from "./types.js";
import { type FetchOptions, URLBuilder } from "./utils.js";

type ScheduleStation = {
  srNo: number;
  stationId: number;
  stationCode: string;
  stationName: string;
  stationType: StationType;
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
  private readonly urlBuilder: URLBuilder<"trainsBtwStations", TrainsBetweenStations[]>;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.urlBuilder = new URLBuilder<"trainsBtwStations", TrainsBetweenStations[]>([], this.baseUrl).addResource(
      "trainsBtwStations",
    );
  }

  getTrainsBtwStations(
    fromStation: StationCode,
    toStation: StationCode,
    options: { allTrains?: boolean; date?: string } = {},
  ): FetchOptions<TrainsBetweenStations[]> {
    options.allTrains ??= false;
    // TODO: Set date to current date
    options.date ??= "";

    return this.urlBuilder.addQueryParam({ fromStation, toStation, date: options.date, allTrains: options.allTrains })
      .buildURL();
  }
}
