import Client from './index'
import { ErrorObj, TrainRunsOnType } from './types'

type StationStop = {
  id: number
  srNo: string
  arrivalTime: string | null
  departureTime: string | null
  haltTime: string | null
  platform: string | null
  dayCount: number
  distance: string
  speed: string
  boardingDisabled: boolean
  updatedAt: string
  stationCode: string
  stationName: string
}

type StationInfo = {
  id: number
  stationCode: string
  stationName: string
  stateName: string
  zoneCode: string
  stationType: string
  hindiStationName: string
}

export type TrainsBtwStationsType = {
  id: number
  trainNumber: string
  trainName: string
  trainFullName: string
  trainRunsOn: TrainRunsOnType
  availableClasses: string[]
  hasPantry: boolean
  trainType: string
  returnTrainNumber: string
  stationFrom: StationStop
  stationTo: StationStop
  updatedAt: string
  distance: number
  duration: string
}

export type TrainsBtwStationsExtraType = {
  stationsInfo: StationInfo[]
}

export default class TrainsBtwStations {
  readonly #client: Client
  constructor(client: Client) {
    this.#client = client
  }

  async getTrainsBtweenStations(
    fromStationCode: string,
    toStationCode: string,
    date?: string,
  ) {
    return await this.#client.apiRequest<
      TrainsBtwStationsType,
      ErrorObj,
      TrainsBtwStationsExtraType
    >({
      method: 'GET',
      query: { fromStation: fromStationCode, toStation: toStationCode, date },
      path: 'trainsBtwStations',
    })
  }
}
