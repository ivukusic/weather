export const URLS = {
  weatherCity: (city: string) => `weather?q=${city}`,
  weatherLatLong: (lat: number, lon: number) => `weather?lat=${lat}&lon=${lon}`,
  weatherCityWeek: (city: string) => `forecast/daily?q=${city}&cnt=14`,
  weatherLatLongWeek: (lat: number, lon: number) => `forecast/daily?lat=${lat}&lon=${lon}&cnt=14`,
};
