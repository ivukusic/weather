import { RouteComponentProps } from 'react-router-dom';

export interface IWeatherProps extends RouteComponentProps {
  addRemoveToFavorites: any;
  cities: any;
  favorites: any;
  getWeatherData: () => {};
  getWeatherDataByCity: any;
  removeFromList: any;
  resetList: any;
  weather: any;
}
