import { Client } from "./index.js";
import type { TrainGeneralInfo, TrainInfo, TrainNumber } from "./types.js";
import { URLBuilder } from "./utils.js";

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
