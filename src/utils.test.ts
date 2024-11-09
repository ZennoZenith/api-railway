import { expect, test } from "vitest";
import type { TrainInfo } from "./trains.js";
import { Client } from "./utils.js";

const BASE_URL = "api.railway.zennozenith.com";
const trainInfoTypeObj: TrainInfo = {
  id: 0,
  trainNumber: "",
  trainName: "",
  trainFullName: "",
  trainRunningDays: {
    sunday: false,
    monday: false,
    tueday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  },
  availableClasses: [],
  hasPantry: false,
  trainTypeCode: "ANT",
  returnTrainNumber: "",
  stationFrom: {
    id: 0,
    stationCode: "",
    stationName: "",
    stationType: "unknown",
  },
  stationTo: {
    id: 0,
    stationCode: "",
    stationName: "",
    stationType: "unknown",
  },
  departureTime: "00:00:00",
  arrivalTime: "00:00:00",
  durationSec: 0,
  distance: 0,
  avgSpeed: 0,
  numberOfStops: 0,
  isActive: false,
  updatedAt: "",
} as const;

test("getTrain", () => {
  const client = new Client();

  expect(client.trains.getTrain("12650"))
    .toStrictEqual({
      url: `https://${BASE_URL}/v1/trains/12650`,
      headers: {},
      params: {},
      body: undefined,
      method: "GET",
      returnType: trainInfoTypeObj,
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
        returnType: [],
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
        returnType: [],
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
        returnType: {},
      },
    );
});

// // TODO: write tests for other routes
