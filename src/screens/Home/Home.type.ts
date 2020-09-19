import { ICityType, IWeatherType } from 'library/types';
import { RouteComponentProps } from 'react-router-dom';

export interface IWeatherProps extends RouteComponentProps {
  cities: ICityType[];
  favorites: string[];
  getWeatherData: () => {};
  getWeatherDataByCity: (data: {
    city?: string;
    lat?: number;
    long?: number;
    transformCityName?: boolean;
    future?: boolean;
  }) => Promise<{ success: boolean; data?: { city: string; weather: IWeatherType } }>;
  resetList: () => void;
  weather: { [key: string]: IWeatherType };
}
