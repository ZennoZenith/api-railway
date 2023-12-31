import Client from './index'
import { ErrorObj } from './types'

export type StationInfo = {
  id: number
  stationCode: string
  stationName: string
  stateName: string
  stationType: string
  numberOfPlatforms: number
  hindiStationName: string
  zones: { zoneName: string; zoneCode: string }
  latitude: string
  longitude: string
  updatedAt: string
}

export type StationGeneralInfo = {
  id: number
  stationCode: string
  stationName: string
}
export default class Stations {
  readonly #client: Client

  constructor(client: Client) {
    this.#client = client
  }

  async getStations(stationCode: string) {
    return await this.#client.apiRequest<StationInfo, ErrorObj>({
      method: 'GET',
      params: stationCode,
      path: 'stations',
    })
  }

  async getStationsGeneral(q: string, limit: number = 10) {
    return await this.#client.apiRequest<StationGeneralInfo, ErrorObj>({
      method: 'GET',
      path: 'stations',
      query: {
        q,
        limit,
      },
    })
  }
}
