import Client from './index'
import { ErrorObj } from './types'

type TrainInfo = {
  id: number
  trainNumber: string
  trainName: string
  stationFrom: { stationCode: string; id: number; stationName: string }
  stationTo: { stationCode: string; id: number; stationName: string }
  departureTime: string
  arrivalTime: string
  duration: string
  trainRunsOn: {
    trainRunsOnSun: 'Y' | 'N'
    trainRunsOnMon: 'Y' | 'N'
    trainRunsOnTue: 'Y' | 'N'
    trainRunsOnWed: 'Y' | 'N'
    trainRunsOnThu: 'Y' | 'N'
    trainRunsOnFri: 'Y' | 'N'
    trainRunsOnSat: 'Y' | 'N'
  }
  numberOfStops: number
  trainType: string
  distance: number
  availableClasses: string
  hasPantry: boolean
  returnTrainNumber: string
  updatedAt: Date
}

type TrainGeneralInfo = {
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
    return await this.#client.apiRequest<TrainInfo[], ErrorObj[]>({
      method: 'GET',
      params: trainNumber,
      path: 'trains',
    })
  }

  async getTrainsGeneral(q: string, limit: number = 10) {
    return await this.#client.apiRequest<TrainGeneralInfo[], ErrorObj[]>({
      method: 'GET',
      path: 'trains',
      query: {
        q,
        limit,
      },
    })
  }
}
