import { Client } from "./index.js";
import type { StationGeneralInfo } from "./stations.js";
import type { ApiError, ApiResponse, TimeString, TrainNumber, TrainTime } from "./types.js";
import { catchError, URLBuilder } from "./utils.js";

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
  readonly #client: Client;
  private readonly baseUrl: string;
  private readonly urlBuilder: URLBuilder<"schedules">;

  constructor(client: Client) {
    this.#client = client;
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.urlBuilder = new URLBuilder<"schedules">(this.baseUrl).addResource("schedules");
  }

  async getSchedule(trainNumber: TrainNumber, fullSchedule?: boolean): Promise<ApiResponse<ScheduleRow[]>> {
    let response = await catchError(
      this.urlBuilder.addResource(trainNumber).addQueryParam({ fullSchedule }).fetch({
        headers: {
          "x-api-key": this.#client.apiKey,
        },
        method: "GET",
      }),
    );

    if (response[0]) {
      return { error: response[0], data: undefined };
    }

    let data = await catchError<ScheduleRow[] | ApiError>(response[1].json());

    if (data[0]) {
      return { error: data[0], data: undefined };
    }

    if ((data[1] as ApiError).error) {
      return { apiError: response[0], data: undefined };
    }
    return { data: data[1] as ScheduleRow[], apiError: undefined, error: undefined };
  }
}
