import { expect, test } from "vitest";
import { Client } from "./utils.js";

const BASE_URL = "api.railway.zennozenith.com";
test("getTrain", () => {
  const client = new Client();

  expect(client.trains.getTrain("12650"))
    .toStrictEqual({
      url: `https://${BASE_URL}/v1/trains/12650`,
      headers: {},
      params: {},
      body: undefined,
      method: "GET",
    });
});

test("getTrainsLikeNumber train number", () => {
  const client = new Client();
  expect(client.trains.getTrainsLikeNumber("12650"))
    .toStrictEqual(
      {
        url: "https://api.railway.zennozenith.com/v1/trains?trainNumber=12650&limit=10",
        headers: {},
        params: {
          trainNumber: "12650",
          limit: 10,
        },
        body: undefined,
        method: "GET",
      },
    );
});

test("getTrainsLikeNumber query", () => {
  const client = new Client();
  expect(client.trains.getTrainsLikeQuery("kir"))
    .toStrictEqual(
      {
        url: "https://api.railway.zennozenith.com/v1/trains?q=kir&limit=10",
        headers: {},
        params: {
          q: "kir",
          limit: 10,
        },
        body: undefined,
        method: "GET",
      },
    );
});

test("health check", () => {
  const client = new Client();
  expect(client.healthCheck.check())
    .toStrictEqual(
      {
        url: "https://api.railway.zennozenith.com/v1/health_check",
        headers: {},
        params: {},
        body: undefined,
        method: "GET",
      },
    );
});

// // TODO: write tests for other routes
