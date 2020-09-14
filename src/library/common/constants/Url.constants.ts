export const URLS = {
  weatherCity: (city: string) => `weather?q=${city}`,
  weatherCityWeek: (city: string) => `forecast/daily?q=${city}&cnt=14`,
};
