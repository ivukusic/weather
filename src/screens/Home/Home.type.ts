import { RouteComponentProps } from 'react-router-dom';

export interface IWeatherProps extends RouteComponentProps {
  addRemoveToFavorites: any;
  cities: any;
  favorites: any;
  getWeatherData: () => {};
  removeFromList: any;
  resetList: any;
  weather: any;
}
