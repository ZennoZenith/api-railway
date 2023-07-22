import Schedules from './schedules'
import Stations from './stations'
import Trains from './trains'
import Misc from './misc'
import { LooseObject } from './types'

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
  query?: Record<string, string | number>
}

// define how long to wait API response before throwing a timeout error
const API_TIMEOUT = 15000
const BASE_URL = 'api.railwayapi.site'
const API_VRSION = 'v1'
const DEFAULT_PROTOCOL = 'https'

function setInstances(client: Client) {
  client.trains = new Trains(client)
  client.stations = new Stations(client)
  client.schedules = new Schedules(client)
  client.misc = new Misc(client)
}

const prepareParams = (opts: ParamsBuilderOpts, self: Client) => {
  // const params = _.cloneDeep(opts)
  const params = { ...opts } as LooseObject
  params.method = params.method || 'GET'
  params.json = true
  params.resolveWithFullResponse = true

  params.url = `${self.protocol}://${self.baseUrl}`
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
class Client {
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

  async apiRequest<T, U>(opts: ParamsBuilderOpts) {
    const params = prepareParams(opts, this)
    const res = await fetch(params.url, {
      method: params.method,
      headers: params.headers,
    })
    const json = await res.json()

    if (res.ok) {
      this.#apiCalls++
    }

    const data = {
      httpStatusCode: res.status,
      httpStatusText: res.statusText,
      responseType: res.type,
      ok: res.ok,
      url: res.url,
      responseHeaders: res.headers,
      data: json.data as T | undefined,
      errors: json.errors as U | undefined,
    }
    return data
  }
}
export { Client }
export default Client
