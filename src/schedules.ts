import { Client } from "./index.js";
import type { ScheduleRow, TrainNumber } from "./types.js";
import { URLBuilder } from "./utils.js";

export default class Schedules {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.headers = client.headers;
  }

  getScheduleParts(trainNumber: TrainNumber, fullSchedule?: boolean) {
    fullSchedule ??= false;
    const urlBuilder = new URLBuilder<"schedules", ScheduleRow[]>(this.baseUrl, this.headers).addResource(
      "schedules",
    );
    return urlBuilder.addResource(trainNumber).addQueryParam({ fullSchedule }).buildURL();
  }

  async getSchedule(trainNumber: TrainNumber, fullSchedule?: boolean) {
    fullSchedule ??= false;
    const urlBuilder = new URLBuilder<"schedules", ScheduleRow[]>(this.baseUrl, this.headers).addResource(
      "schedules",
    );
    return urlBuilder.addResource(trainNumber).addQueryParam({ fullSchedule }).fetch();
  }
}
