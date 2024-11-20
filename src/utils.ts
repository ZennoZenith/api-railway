import HealthCheck from "./health_check.js";
import Schedules from "./schedules.js";
import Stations from "./stations.js";
import Trains from "./trains.js";
import TrainsBtwStations from "./trainsBtwStations.js";
import type { HTTP_MEHTODS, StationCode, TrainNumber } from "./types.js";

interface APIAttributes {
  trains: { trainNumber: TrainNumber; limit?: number } | { q: string; limit?: number };
  stations: { stationCode: StationCode; limit?: number } | { q: string; limit?: number };
  schedules: { fullSchedule: boolean };
  trainsBtwStations: {
    fromStation: StationCode;
    toStation: StationCode;
    date?: string;
    allTrains?: boolean;
    flexible?: boolean;
  };
  healthCheck: {};
}

type API = keyof APIAttributes;

interface SegmentTypes {
  healthCheck: "health_check";
  trains: "trains" | TrainNumber;
  stations: "stations" | StationCode;
  schedules: "schedules" | TrainNumber;
  trainsBtwStations: "trainsBtwStations";
}

export interface FetchOptions {
  url: string;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params: Record<string, string>;
  body?: Record<string, any>;
}

export class URLBuilder<T extends API, U> {
  private baseURL: string;
  private segments: string[] = [];
  private queryParameters?: APIAttributes[T];
  private headers: Record<string, string>;
  private body?: Record<string, any>;
  private method: HTTP_MEHTODS;

  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.headers = headers;
    this.baseURL = baseURL;
    this.method = "GET";
  }

  // Add resource and query parameters
  addResource(resource: SegmentTypes[T]): URLBuilder<T, U> {
    this.segments.push(resource);
    return this;
  }
  addQueryParam(value: APIAttributes[T]): URLBuilder<T, U> {
    this.queryParameters = value;
    return this;
  }
  addHeader(key: string, value: string): URLBuilder<T, U> {
    this.headers[key] = value;
    return this;
  }
  setBody(body: Record<string, any>): URLBuilder<T, U> {
    this.body = body;
    return this;
  }
  setMethod(method: HTTP_MEHTODS): URLBuilder<T, U> {
    this.method = method;
    return this;
  }

  // Build the URL
  buildURL(): FetchOptions {
    let url = `${this.baseURL}/${this.segments.join("/")}`;

    if (this.queryParameters) {
      const queryParams = new URLSearchParams(
        Object.entries(this.queryParameters).map(
          ([key, value]) => [key, String(value)],
        ),
      ).toString();
      if (queryParams) {
        url += `?${queryParams}`;
      }
    }

    return {
      url,
      headers: this.headers,
      params: this.queryParameters || {},
      body: this.body,
      method: this.method,
    };
  }
}

const API_TIMEOUT = 15000;
const BASE_URL = "api.railway.zennozenith.com";
const API_VRSION = "v1";
const DEFAULT_PROTOCOL = "https";

type Options = {
  API_VERSION?: string;
  API_KEY?: string;
  BASE_URL?: string;
  API_TIMEOUT?: number;
  PROTOCOL?: "http" | "https";
};

export class Client {
  #apiCalls = 0;
  readonly apiKey: string | null;
  readonly baseUrl: string;
  readonly apiVersion: string;
  readonly apiTimeout: number;
  readonly protocol: "http" | "https";
  readonly trains: Trains;
  readonly stations: Stations;
  readonly schedules: Schedules;
  readonly trainsBtwStations: TrainsBtwStations;
  readonly healthCheck: HealthCheck;
  readonly headers: Record<string, string>;

  constructor(options: Options = {}) {
    this.headers = {};
    this.apiKey = options.API_KEY || null;
    this.baseUrl = options.BASE_URL || BASE_URL;
    this.apiVersion = options.API_VERSION || API_VRSION;
    this.apiTimeout = options.API_TIMEOUT || API_TIMEOUT;
    this.protocol = options.PROTOCOL || DEFAULT_PROTOCOL;
    this.healthCheck = new HealthCheck(this);
    this.trains = new Trains(this);
    this.stations = new Stations(this);
    this.schedules = new Schedules(this);
    this.trainsBtwStations = new TrainsBtwStations(this);

    if (this.apiKey) {
      this.headers["x-api-key"] = this.apiKey;
    }
  }

  get apiCalls() {
    return this.#apiCalls;
  }
}
