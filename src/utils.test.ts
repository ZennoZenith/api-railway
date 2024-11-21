import { expect, test } from "vitest";
import { Client } from "./utils.js";

const BASE_URL = "api.railway.zennozenith.com";
test("getTrain", () => {
  const client = new Client();

  expect(client.trains.getTrainParts("12650"))
    .toStrictEqual({
      url: `https://${BASE_URL}/v1/trains/12650`,
      headers: {},
      params: {},
      body: null,
      method: "GET",
    });
});

test("getTrainsLikeNumber train number", () => {
  const client = new Client();
  expect(client.trains.getTrainsLikeNumberParts("12650"))
    .toStrictEqual(
      {
        url: `https://${BASE_URL}/v1/trains?trainNumber=12650&limit=10`,
        headers: {},
        params: {
          trainNumber: "12650",
          limit: 10,
        },
        body: null,
        method: "GET",
      },
    );
});

test("getTrainsLikeNumber query", () => {
  const client = new Client();
  expect(client.trains.getTrainsLikeQueryParts("kir"))
    .toStrictEqual(
      {
        url: `https://${BASE_URL}/v1/trains?q=kir&limit=10`,
        headers: {},
        params: {
          q: "kir",
          limit: 10,
        },
        body: null,
        method: "GET",
      },
    );
});

test("health check", () => {
  const client = new Client();
  expect(client.healthCheck.checkParts())
    .toStrictEqual(
      {
        url: `https://${BASE_URL}/v1/health_check`,
        headers: {},
        params: {},
        body: null,
        method: "GET",
      },
    );
});

// // TODO: write tests for other routes
