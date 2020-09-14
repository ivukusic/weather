import { RouteComponentProps } from 'react-router-dom';

export interface ICityProps extends RouteComponentProps {
  addRemoveToFavorites: any;
  favorites: any;
  getWeatherDataByCity: any;
  saveNotes: any;
  weather: any;
}
