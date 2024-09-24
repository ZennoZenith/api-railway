import Client from './index'
import { ErrorObj, TrainRunsOnType } from './types'

export type TrainInfo = {
  id: number
  trainNumber: string
  trainName: string
  trainFullName: string
  stationFrom: { stationCode: string; id: number; stationName: string }
  stationTo: { stationCode: string; id: number; stationName: string }
  departureTime: string
  arrivalTime: string
  duration: string
  trainRunsOn: TrainRunsOnType
  numberOfStops: number
  trainTypeCode: string
  distance: number
  availableClasses: string[]
  avgSpeed: number
  hasPantry: boolean
  returnTrainNumber: string
  updatedAt: string
}

export type TrainGeneralInfo = {
  id: number
  trainNumber: string
  trainName: string
}
export default class Trains {
  readonly #client: Client

  constructor(client: Client) {
    this.#client = client
  }

  async getTrains(trainNumber: string) {
    return await this.#client.apiRequest<TrainInfo, ErrorObj>({
      method: 'GET',
      params: trainNumber,
      path: 'trains',
    })
  }

  async getTrainsGeneral(q: string, limit: number = 10) {
    console.log()
    return await this.#client.apiRequest<TrainGeneralInfo, ErrorObj>({
      method: 'GET',
      path: 'trains',
      query: {
        q,
        limit,
      },
    })
  }
}
