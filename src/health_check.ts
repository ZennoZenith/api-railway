import { Client } from "./index.js";
import type { ApiResponse } from "./types.js";
import { catchError, URLBuilder } from "./utils.js";

export default class HealthCheck {
  private readonly baseUrl: string;
  private readonly urlBuilder: URLBuilder<"healthCheck">;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.urlBuilder = new URLBuilder<"healthCheck">(this.baseUrl).addResource("health_check");
  }

  async check(): Promise<ApiResponse<boolean>> {
    let response = await catchError(
      this.urlBuilder.fetch({
        method: "GET",
      }),
    );

    if (response[0]) {
      return { error: response[0], data: undefined };
    }

    if (response[1].status === 200) {
      return { data: true, apiError: undefined, error: undefined };
    }

    return { data: false, apiError: undefined, error: undefined };
  }
}
