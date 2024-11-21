export type HTTP_MEHTODS = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type ApiError = {
  error: string;
  httpCode: number;
  errorCode: number;
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
export type DateString = string;
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

export type TrainInfo = {
  id: number;
  trainNumber: string;
  trainName: string;
  trainFullName: string;
  trainRunningDays: TrainRunsOnDays;
  availableClasses: TrainClassTypeXX[];
  hasPantry: boolean;
  trainTypeCode: TrainTypeCode;
  returnTrainNumber: string;
  stationFrom: {
    id: number;
    stationCode: StationCode;
    stationName: string;
    stationType: StationType;
  };
  stationTo: {
    id: number;
    stationCode: StationCode;
    stationName: string;
    stationType: StationType;
  };
  departureTime: TrainTime;
  arrivalTime: TrainTime;
  durationSec: number;
  distance: number;
  avgSpeed: number;
  numberOfStops: number;
  isActive: boolean;
  updatedAt: TimeString;
};

export type TrainGeneralInfo = {
  id: number;
  trainNumber: string;
  trainName: string;
  trainTypeCode: TrainTypeCode;
};

export type StationInfo = {
  id: number;
  stationCode: StationCode;
  stationName: string;
  stateName: string;
  zoneCode: string;
  stationAlternateText: string;
  stationType: StationType;
  numberOfPlatforms: number;
  hindiStationName: string;
  latitude?: number;
  longitude?: number;
  updatedAt: TimeString;
};

export type StationGeneralInfo = {
  id: number;
  stationCode: StationCode;
  stationName: string;
  stationType: StationType;
};

export type ScheduleRow = {
  srNo: string;
  station: StationGeneralInfo;
  arrivalTime: TrainTime;
  departureTime: TrainTime;
  haltTime: string;
  platform: string;
  dayCount: number;
  distance: number;
  speed: number;
  boardingDisabled: boolean;
  updatedAt: TimeString;
};

export type ScheduleStation = {
  srNo: string;
  stationId: number;
  arrivalTime: TrainTime;
  departureTime: TrainTime;
  haltTimeSec: number;
  platform: string;
  dayCount: number;
  distance: number;
  speed: number;
  boardingDisabled: boolean;
  updatedAt: TimeString;
};

export type TrainsBetweenStations = {
  stations: StationGeneralInfo[];
  date: DateString;
  flexible: boolean;
  trainsOnDate: TrainsBetweenStationsTrains[];
  trainsOnAlternateDate: TrainsBetweenStationsTrains[];
};

export type TrainsBetweenStationsTrains = {
  trainId: number;
  trainNumber: TrainNumber;
  trainName: string;
  trainFullName: string;
  trainRunningDays: TrainRunsOnDays;
  availableClasses: TrainClassTypeXX[];
  hasPantry: boolean;
  trainTypeCode: string;
  returnTrainNumber: string;
  distance: number;
  durationSec: number;
  stationFrom: ScheduleStation;
  stationTo: ScheduleStation;
  updatedAt: TimeString;
};
