export type ErrorObj = {
  httpCode: number
  type: string
  code: string
  title: string
  description: string
  href: string
  path: string
  [key: string]: any
}

export const enum TrainRunsOnDays {
  sunday = 'sunday',
  monday = 'monday',
  tueday = 'tueday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
}

export type TrainRunsOnType = Record<TrainRunsOnDays, boolean>

export interface LooseObject {
  [key: string]: any
}
