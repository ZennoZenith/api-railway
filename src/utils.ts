import Trains from "./trains.js";
import type { TrainNumber } from "./types.js";

interface APIAttributes {
  trains: { trainNumber: string; limit?: number } | { q: string; limit?: number };
  stations: { id: number; name?: string };
}
type API = keyof APIAttributes;

interface SegmentTypes {
  trains: "trains" | TrainNumber;
  stations: "stations";
}

interface FetchOptions {
  headers?: Record<string, string | null | undefined>;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, any>;
}

export class URLBuilder<T extends API> {
  private baseURL: string;
  private segments: string[] = [];
  private queryParameters?: APIAttributes[T];

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // HTTP Methods
  async get(): Promise<Response> {
    return this.fetch({ method: "GET" });
  }
  async post(body?: Record<string, any>): Promise<Response> {
    return this.fetch({ method: "POST", body });
  }
  async put(body?: Record<string, any>): Promise<Response> {
    return this.fetch({ method: "PUT", body });
  }
  async delete(): Promise<Response> {
    return this.fetch({ method: "DELETE" });
  }

  // Add resource and query parameters
  addResource(resource: SegmentTypes[T]): URLBuilder<T> {
    this.segments.push(resource);
    return this;
  }
  addQueryParam(value: APIAttributes[T]): URLBuilder<T> {
    this.queryParameters = value;
    return this;
  }

  // Build the URL
  buildURL(): string {
    let url = `${this.baseURL}/${this.segments.join("/")}`;
    if (!this.queryParameters) {
      return url;
    }
    const queryParams = new URLSearchParams(
      Object.entries(this.queryParameters).map(
        ([key, value]) => [key, String(value)],
      ),
    ).toString();
    if (queryParams) {
      url += `?${queryParams}`;
    }
    return url;
  }

  // Fetch data
  async fetch(options: FetchOptions = {}): Promise<Response> {
    const { body, method = "GET", headers = {} } = options;
    return fetch(this.buildURL(), {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
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

export async function catchError<T, E = Error>(promise: Promise<T>): Promise<[undefined, T] | [E]> {
  try {
    const data = await promise;
    return [undefined, data] as [undefined, T];
  } catch (error) {
    return [error] as [E];
  }
}
export class Client {
  #apiCalls = 0;
  readonly apiKey: string | null;
  readonly baseUrl: string;
  readonly apiVersion: string;
  readonly apiTimeout: number;
  readonly protocol: "http" | "https";
  readonly trains: Trains;
  // stations: Stations;
  // schedules: Schedules;
  // misc: Misc;
  // trainsBtwStations!: TrainsBtwStations;

  constructor(options: Options = {}) {
    this.apiKey = options.API_KEY || null;
    this.baseUrl = options.BASE_URL || BASE_URL;
    this.apiVersion = options.API_VERSION || API_VRSION;
    this.apiTimeout = options.API_TIMEOUT || API_TIMEOUT;
    this.protocol = options.PROTOCOL || DEFAULT_PROTOCOL;
    this.trains = new Trains(this);
    // client.stations = new Stations(client);
    // client.schedules = new Schedules(client);
    // client.trainsBtwStations = new TrainsBtwStations(client);
    // client.misc = new Misc(client);
  }

  get apiCalls() {
    return this.#apiCalls;
  }
}
