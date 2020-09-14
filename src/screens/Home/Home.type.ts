import { RouteComponentProps } from 'react-router-dom';

export interface IWeatherProps extends RouteComponentProps {
  cities: any;
  getWeatherData: () => {};
  weather: any;
}
