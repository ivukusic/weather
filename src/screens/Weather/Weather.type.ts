export interface WeatherCurrentType {
  humidity: number;
  pressure: number;
  temp: number;
  weather: { description: string; main: string }[];
}

export interface WeatherDailyType {
  labels: string[];
  data: { dataDailyMin: number[]; dataDailyMax: number[]; dataDailyDay: number[] };
}

export interface WeatherHourlyType {
  labels: string[];
  data: number[];
}

export interface WeatherType {
  current: WeatherCurrentType;
  daily: WeatherDailyType;
  hourly: WeatherHourlyType;
}

export interface WeatherDailyNetworkType {
  dt: number;
  temp: { day: number; min: number; max: number };
}

export interface WeatherHourlyNetworkType {
  dt: number;
  temp: number;
}

export interface WeatherNetworkType {
  current: WeatherCurrentType;
  daily: WeatherDailyNetworkType[];
  hourly: WeatherHourlyNetworkType[];
}
