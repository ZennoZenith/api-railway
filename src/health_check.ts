import { Client } from "./index.js";
import { URLBuilder } from "./utils.js";

export default class HealthCheck {
  private readonly baseUrl: string;
  private readonly urlBuilder: URLBuilder<"healthCheck", {}>;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.urlBuilder = new URLBuilder<"healthCheck", {}>(this.baseUrl).addResource("health_check");
  }

  check() {
    return this.urlBuilder.buildURL();
  }
}
