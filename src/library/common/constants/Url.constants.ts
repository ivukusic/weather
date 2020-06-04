export const URLS = {
  login: 'login/',
  weatherCity: (city: string) => `weather?city=${city}`,
  weatherOneCall: (lat: number, long: number) => `onecall?lat=${lat}&lon=${long}`,
};
