export interface ICityType {
  datasetid: string;
  fields: {
    accentcity: string;
    city: string;
    country: string;
    geopoint: number[];
    latitude: number;
    longitude: number;
    population: number;
    region: string;
  };
  geometry: { type: string; coordinates: number[] };
  record_timestamp: string;
  recordid: string;
}

export interface IWeatherDayType {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: { feels_like: number; humidity: number; pressure: number; temp: number; temp_max: number; temp_min: number };
  name: string;
  sys: { type: number; id: number; country: string; sunrise: 1600477019; sunset: 1600520870 };
  timezone: number;
  visibility: number;
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number };
}

export interface IWeatherType {
  city: string;
  current: IWeatherDayType;
  notes?: string[];
  show: boolean;
  weekForecast: {
    list?: IWeatherDayType[];
  };
}
