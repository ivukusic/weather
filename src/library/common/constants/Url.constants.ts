export const BASE_URL = process.env.REACT_APP_WEATHER_BASE_URL;
const APP_ID = process.env.REACT_APP_WEATHER_APP_ID;

export const URLS = {
  getCities:
    'https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q=&rows=15&sort=population&facet=country',
  weatherCity: (city: string) => `${BASE_URL}/weather?q=${city}&appid=${APP_ID}`,
  weatherLatLong: (lat: number, lon: number) => `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}`,
  weatherCityWeek: (city: string) => `${BASE_URL}/forecast/daily?q=${city}&cnt=14&appid=${APP_ID}`,
  weatherLatLongWeek: (lat: number, lon: number) =>
    `${BASE_URL}/forecast/daily?lat=${lat}&lon=${lon}&cnt=14&appid=${APP_ID}`,
};
