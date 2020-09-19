import { IWeatherType } from 'library/types';
import { RouteComponentProps } from 'react-router-dom';

export interface ICityTypeProps extends RouteComponentProps {
  addRemoveToFavorites: (city: string) => Promise<any>;
  favorites: string[];
  getWeatherDataByCity: (data: {
    city?: string;
    lat?: number;
    long?: number;
    transformCityName?: boolean;
    future?: boolean;
  }) => Promise<{ success: boolean; data?: { city: string; weather: IWeatherType } }>;
  saveNotes: (city: string, note: string) => Promise<void>;
  weather: { [key: string]: IWeatherType };
}
