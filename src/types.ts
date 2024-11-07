export type HTTP_MEHTODS = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type ApiError = {
  error: string;
  http_code: number;
  error_code: number;
  title: string;
  href: string;
};

export type TrainRunsOnDays = {
  sunday: boolean;
  monday: boolean;
  tueday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
};

export interface LooseObject {
  [key: string]: any;
}

export type TrainNumber = string;
export type StationCode = string;
export type TimeString = string;
export type TrainTime = `${string}:${string}:${string}`;
export type StationType = [
  "unknown",
  "terminus",
  "junction",
  "regular",
  "workshop",
  "port",
  "shed",
  "yard",
  "siding",
  "cabin",
  "depot",
  "point",
][number];

export type TrainClassTypeXX = [
  "GEN",
  "2A",
  "3A",
  "SL",
  "1A",
  "CC",
  "FC",
  "2S",
  "GN",
  "3E",
  "EA",
  "EC",
  "GRD",
  "UNRESERVED",
  "EV",
  "Ex",
  "",
  "PC",
  "VS",
][number];

export type TrainTypeCode = [
  "ANT",
  "DEMU",
  "DRNT",
  "EXP",
  "GR",
  "HMS",
  "JSHTB",
  "MEMU",
  "OTHER",
  "PASS",
  "RAJ",
  "SF",
  "SHTB",
  "SKR",
  "T18",
  "TJS",
  "TOY",
  "UKN",
][number];
