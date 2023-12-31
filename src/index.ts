import { ErrorObj, TrainRunsOnDays, TrainRunsOnType } from './types'
import Schedules, { ScheduleInfo, ScheduleRow } from './schedules'
import Stations, { StationGeneralInfo, StationInfo } from './stations'
import Trains, { TrainGeneralInfo, TrainInfo } from './trains'
import TrainsBtwStations, {
  TrainsBtwStationsExtraType,
  TrainsBtwStationsType,
} from './trainsBtwStations'
import Misc, { State, TrainType, Zone } from './misc'
import { LooseObject } from './types'

type ApiRetrunDataType =
  | ScheduleInfo
  | ScheduleRow
  | State
  | StationGeneralInfo
  | StationInfo
  | TrainGeneralInfo
  | TrainInfo
  | TrainsBtwStationsType
  | TrainType
  | Zone

type Options = {
  API_VERSION?: string
  API_KEY?: string
  BASE_URL?: string
  API_TIMEOUT?: number
  PROTOCOL?: 'http' | 'https'
}

type ParamsBuilderOpts = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path?: string
  params?: string
  query?: Record<string, string | number | undefined>
}

export type ApiRetrunType<
  T extends ApiRetrunDataType,
  U extends ErrorObj = ErrorObj,
  V = {},
> = {
  httpStatusCode: number
  httpStatusText: string
  responseType: ResponseType
  ok: boolean
  url: string
  responseHeaders: Headers
  data: T[] | undefined
  errors: U[] | undefined
  raw: any
  extra?: V
}

// define how long to wait API response before throwing a timeout error
const API_TIMEOUT = 15000
const BASE_URL = 'api.railwayapi.site/api'
const API_VRSION = 'v1'
const DEFAULT_PROTOCOL = 'https'

function setInstances(client: Client) {
  client.trains = new Trains(client)
  client.stations = new Stations(client)
  client.schedules = new Schedules(client)
  client.trainsBtwStations = new TrainsBtwStations(client)
  client.misc = new Misc(client)
}

const prepareParams = (opts: ParamsBuilderOpts, self: Client) => {
  // const params = _.cloneDeep(opts)
  const params = { ...opts } as LooseObject
  params.method = params.method || 'GET'
  params.json = true
  params.resolveWithFullResponse = true

  params.url = `${self.protocol}://${self.baseUrl}/${self.apiVersion}`
  if (params.path) {
    params.url = `${params.url}/${params.path}`
  }
  if (params.params) {
    params.url = `${params.url}/${params.params}`
  }

  params.url = `${params.url}?`

  const tempArr: string[] = []
  for (const key in params.query) {
    if (Object.prototype.hasOwnProperty.call(params.query, key)) {
      tempArr.push(`${key}=${params.query[key]}`)
    }
  }
  params.url = params.url + tempArr.join('&')

  params.timeout = self.apiTimeout
  params.headers = {
    apiKey: self.apiKey,
  }
  return params
}

export class Client {
  #apiCalls = 0
  #apiKey: string | null
  #baseUrl: string
  #apiVersion: string
  #apiTimeout: number
  #protocol: 'http' | 'https'
  trains!: Trains
  stations!: Stations
  schedules!: Schedules
  misc!: Misc
  trainsBtwStations!: TrainsBtwStations

  constructor(options: Options = {}) {
    this.#apiKey = options.API_KEY || null
    this.#baseUrl = options.BASE_URL || BASE_URL
    this.#apiVersion = options.API_VERSION || API_VRSION
    this.#apiTimeout = options.API_TIMEOUT || API_TIMEOUT
    this.#protocol = options.PROTOCOL || DEFAULT_PROTOCOL
    setInstances(this)
  }

  get apiCalls() {
    return this.#apiCalls
  }
  get apiKey() {
    return this.#apiKey
  }
  get baseUrl() {
    return this.#baseUrl
  }
  get apiVersion() {
    return this.#apiVersion
  }
  get apiTimeout() {
    return this.#apiTimeout
  }
  get protocol() {
    return this.#protocol
  }
  // setApiKey(apiKey: string) {
  //   this.#apiKey = apiKey
  //   return this.#apiKey
  // }

  async apiRequest<
    T extends ApiRetrunDataType,
    U extends ErrorObj = ErrorObj,
    V = {},
  >(
    opts: ParamsBuilderOpts,
  ) {
    const params = prepareParams(opts, this)
    const res = await fetch(params.url, {
      method: params.method,
      headers: params.headers,
    })
    const json = await res.json()

    if (res.ok) {
      this.#apiCalls++
    }

    const data: ApiRetrunType<T, U, V> = {
      httpStatusCode: res.status,
      httpStatusText: res.statusText,
      responseType: res.type,
      ok: res.ok,
      // ok: function(data): data is T[] ,
      url: res.url,
      responseHeaders: res.headers,
      // data: res.ok ? json.data as T[] : [] as T[],
      data: json.data,
      extra: res.ok ? json.extra as V : {} as V,
      errors: json.errors,
      raw: json,
    }

    return data
  }
}

export {
  ApiRetrunDataType,
  ErrorObj,
  ScheduleInfo,
  ScheduleRow,
  State,
  StationGeneralInfo,
  StationInfo,
  TrainGeneralInfo,
  TrainInfo,
  TrainRunsOnDays,
  TrainRunsOnType,
  TrainsBtwStationsExtraType,
  TrainsBtwStationsType,
  TrainType,
  Zone,
}

export function isOk<T extends ApiRetrunDataType>(
  apiResponse: ApiRetrunType<T>,
): apiResponse is ApiRetrunType<T> & { data: T[]; errors: undefined } {
  return apiResponse.ok === true
}
export function isError<T extends ApiRetrunDataType, U extends ErrorObj>(
  apiResponse: ApiRetrunType<T, U>,
): apiResponse is ApiRetrunType<T, U> & { data: undefined; errors: U[] } {
  return apiResponse.ok === true
}

export default Client
