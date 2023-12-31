import Client from './index'
import { ErrorObj } from './types'

export type State = {
  stateName: string
}
export type Zone = {
  zoneName: string
  zoneCode: string
}
export type TrainType = {
  trainTypeCode: string
  trainTypeName: string
}
export default class Misc {
  readonly #client: Client

  constructor(client: Client) {
    this.#client = client
  }

  async getStates(q: string) {
    return await this.#client.apiRequest<State, ErrorObj>({
      method: 'GET',
      query: { q },
      path: 'states',
    })
  }
  async getAllStates() {
    return await this.#client.apiRequest<State, ErrorObj>({
      method: 'GET',
      path: 'states/all',
    })
  }
  async getZones(q: string) {
    return await this.#client.apiRequest<Zone, ErrorObj>({
      method: 'GET',
      query: { q },
      path: 'zones',
    })
  }
  async getAllZones() {
    return await this.#client.apiRequest<Zone, ErrorObj>({
      method: 'GET',
      path: 'zones/all',
    })
  }
  async getTrainTypes(q: string) {
    return await this.#client.apiRequest<TrainType, ErrorObj>({
      method: 'GET',
      query: { q },
      path: 'trainTypes',
    })
  }
  async getAllTrainTypes() {
    return await this.#client.apiRequest<TrainType, ErrorObj>({
      method: 'GET',
      path: 'trainTypes/all',
    })
  }
}
