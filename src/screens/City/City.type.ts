import { RouteComponentProps } from 'react-router-dom';

export interface ICityProps extends RouteComponentProps {
  getWeatherDataByCity: any;
  weather: any;
}
