export type ErrorObj = {
  httpCode: number
  code: string
  title: string
  description: string
  href: string
  path: string
}

export interface LooseObject {
  [key: string]: any
}
