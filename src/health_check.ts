import { Client } from "./index.js";
import { URLBuilder } from "./utils.js";

export default class HealthCheck {
  private readonly baseUrl: string;
  private readonly urlBuilder: URLBuilder<"healthCheck", {}>;

  constructor(client: Client) {
    this.baseUrl = `${client.protocol}://${client.baseUrl}/${client.apiVersion}`;
    this.urlBuilder = new URLBuilder<"healthCheck", { status: "OK" }>(this.baseUrl).addResource("health_check");
  }

  checkParts() {
    return this.urlBuilder.buildURL();
  }

  async check() {
    return this.urlBuilder.fetch();
  }
}
