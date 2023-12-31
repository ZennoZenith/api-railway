import Client from './index'
import { ErrorObj } from './types'

export type ScheduleInfo = {
  id: number
  trainNumber: string
  trainName: string
  schedule: ScheduleRow[]
}

export type ScheduleRow = {
  srNo: string
  stationId: number
  stationName: string
  stationCode: string
  arrivalTime: number | null
  departureTime: string | null
  distance: string
  haltTime: string | null
  dayCount: number
  platform: string | null
  boardingDisabled: boolean
  speed: string
}

export default class Schedules {
  readonly #client: Client

  constructor(client: Client) {
    this.#client = client
  }

  async getSchedules(trainNumber: string, ..._trainNumbers: string[]) {
    return await this.#client.apiRequest<ScheduleInfo, ErrorObj>({
      method: 'GET',
      params: trainNumber,
      path: 'schedules',
    })
  }
}
