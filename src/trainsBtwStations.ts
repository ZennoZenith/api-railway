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
} from "./types.js";
import { catchError, URLBuilder } from "./utils.js";

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
  readonly #client: Client;
  private readonly baseUrl: string;
  private readonly urlBuilder: URLBuilder<"trainsBtwStations">;

  constructor(client: Client) {
    this.#client = client;
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.urlBuilder = new URLBuilder<"trainsBtwStations">(this.baseUrl).addResource("trainsBtwStations");
  }

  async getTrainsBtwStations(
    fromStation: StationCode,
    toStation: StationCode,
    options: { allTrains?: boolean; date?: string } = {},
  ): Promise<ApiResponse<TrainsBetweenStations[]>> {
    options.allTrains ??= false;
    // TODO: Set date to current date
    options.date ??= "";

    let response = await catchError(
      this.urlBuilder.addQueryParam({ fromStation, toStation, date: options.date, allTrains: options.allTrains }).fetch(
        {
          headers: {
            "x-api-key": this.#client.apiKey,
          },
          method: "GET",
        },
      ),
    );

    if (response[0]) {
      return { error: response[0], data: undefined };
    }

    let data = await catchError<TrainsBetweenStations[] | ApiError>(response[1].json());

    if (data[0]) {
      return { error: data[0], data: undefined };
    }

    if ((data[1] as ApiError).error) {
      return { apiError: response[0], data: undefined };
    }
    return { data: data[1] as TrainsBetweenStations[], apiError: undefined, error: undefined };
  }
}
