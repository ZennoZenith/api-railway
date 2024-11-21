import { Client } from "./index.js";
import type { StationCode, TrainsBetweenStations } from "./types.js";
import { URLBuilder } from "./utils.js";
export default class TrainsBtwStations {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.headers = client.headers;
  }

  getTrainsBtwStationsParts(
    fromStation: StationCode,
    toStation: StationCode,
    options: { allTrains?: boolean; date?: string; flexible?: boolean } = {},
  ) {
    const flexible = options.flexible ?? false;
    const allTrains = options.allTrains ?? false;
    // TODO: better date formate
    const date = options.date ?? new Date().toDateString().slice(0, 10);

    const urlBuilder = new URLBuilder<"trainsBtwStations", TrainsBetweenStations>(
      this.baseUrl,
      this.headers,
    )
      .addResource(
        "trainsBtwStations",
      );
    return urlBuilder.addQueryParam({
      fromStation,
      toStation,
      date,
      flexible,
      allTrains,
    })
      .buildURL();
  }

  async getTrainsBtwStations(
    fromStation: StationCode,
    toStation: StationCode,
    options: { allTrains?: boolean; date?: string; flexible?: boolean } = {},
  ) {
    const flexible = options.flexible ?? false;
    const allTrains = options.allTrains ?? false;
    // TODO: better date formate
    const date = options.date ?? new Date().toDateString().slice(0, 10);

    const urlBuilder = new URLBuilder<"trainsBtwStations", TrainsBetweenStations>(
      this.baseUrl,
      this.headers,
    )
      .addResource(
        "trainsBtwStations",
      );
    return urlBuilder.addQueryParam({
      fromStation,
      toStation,
      date,
      flexible,
      allTrains,
    })
      .fetch();
  }
}
