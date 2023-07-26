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

export interface LooseObject {
  [key: string]: any
}
