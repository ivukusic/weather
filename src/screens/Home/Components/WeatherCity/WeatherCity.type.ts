import { ICityType, IWeatherType } from 'library/types';
import { RouteComponentProps } from 'react-router-dom';

export interface IWeatherCityProps extends RouteComponentProps {
  addRemoveToFavorites: (city: string) => Promise<void>;
  cities: ICityType[];
  favorites: string[];
  city: string;
  getWeatherDataByCity: (data: {
    city?: string;
    lat?: number;
    long?: number;
    transformCityName?: boolean;
    future?: boolean;
  }) => Promise<{ success: boolean; data?: { city: string; weather: IWeatherType } }>;
  isFavorites?: boolean;
  removeFromList: (city: string) => Promise<void>;
  weather: { [key: string]: IWeatherType };
}
