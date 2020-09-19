import { ICityType, IWeatherType } from 'library/types';

export const dummyDataCities: ICityType[] = [
  {
    datasetid: 'worldcitiespop',
    fields: {
      accentcity: 'Delhi',
      city: 'delhi',
      country: 'in',
      geopoint: [28.666667, 77.216667],
      latitude: 28.666667,
      longitude: 77.216667,
      population: 10928270,
      region: '07',
    },
    geometry: { type: 'Point', coordinates: [77.216667, 28.666667] },
    record_timestamp: '2018-01-08T11:47:45.345000+00:00',
    recordid: 'f6da93efee3c5c2ea81ca93aff867ace7e86edef',
  },
];

export const dummyDataFavorites: string[] = ['london', 'new york'];

export const dummyDataWeather: { [key: string]: IWeatherType } = {
  delhi: {
    city: 'Delhi',
    current: {
      base: 'stations',
      clouds: { all: 75 },
      cod: 200,
      coord: { lon: 72.85, lat: 19.01 },
      dt: 1600501695,
      id: 1275339,
      main: {
        feels_like: 308.35,
        humidity: 79,
        pressure: 1004,
        temp: 303.15,
        temp_max: 303.15,
        temp_min: 303.15,
      },
      name: 'Delhi',
      sys: {
        country: 'IN',
        id: 9052,
        sunrise: 1600477019,
        sunset: 1600520870,
        type: 1,
      },
      timezone: 19800,
      visibility: 3000,
      weather: [{ id: 521, main: 'Rain', description: 'shower rain', icon: '09d' }],
      wind: { speed: 2.6, deg: 270 },
    },
    show: true,
    weekForecast: {},
  },
};
