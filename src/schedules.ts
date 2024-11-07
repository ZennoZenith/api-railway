import { Client } from "./index.js";
import type { StationGeneralInfo } from "./stations.js";
import type { TimeString, TrainNumber, TrainTime } from "./types.js";
import { type FetchOptions, URLBuilder } from "./utils.js";

export type ScheduleRow = {
  srNo: number;
  station: StationGeneralInfo;
  arrivalTime: TrainTime;
  departureTime: TrainTime;
  haltTime: string;
  platform: string;
  dayCount: number;
  distance: number;
  speed: number;
  boardingDisabled: boolean;
  updatedAt: TimeString;
};

export default class Schedules {
  private readonly baseUrl: string;
  private readonly urlBuilder: URLBuilder<"schedules", ScheduleRow[]>;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.urlBuilder = new URLBuilder<"schedules", ScheduleRow[]>([], this.baseUrl).addResource("schedules");
  }

  getSchedule(trainNumber: TrainNumber, fullSchedule?: boolean): FetchOptions<ScheduleRow[]> {
    fullSchedule ??= false;
    return this.urlBuilder.addResource(trainNumber).addQueryParam({ fullSchedule }).buildURL();
  }
}
