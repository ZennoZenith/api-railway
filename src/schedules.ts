import { Client } from "./index.js";
import type { StationGeneralInfo } from "./stations.js";
import type { TimeString, TrainNumber, TrainTime } from "./types.js";
import { type FetchOptions, URLBuilder } from "./utils.js";

export type ScheduleRow = {
  srNo: string;
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
  private readonly headers: Record<string, string>;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.headers = client.headers;
  }

  getSchedule(trainNumber: TrainNumber, fullSchedule?: boolean): FetchOptions<ScheduleRow[]> {
    fullSchedule ??= false;
    const urlBuilder = new URLBuilder<"schedules", ScheduleRow[]>([], this.baseUrl, this.headers).addResource(
      "schedules",
    );
    return urlBuilder.addResource(trainNumber).addQueryParam({ fullSchedule }).buildURL();
  }
}
