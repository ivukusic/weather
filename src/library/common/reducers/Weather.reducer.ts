import { TYPE_SET_CITIES, TYPE_SET_FAVORITES, TYPE_SET_WEATHER } from 'library/common/constants/Store.constants';
import { ICityType, IWeatherType } from 'library/types';

export const WEATHER_REDUCER_INITIAL_STATE = {
  cities: [],
  favorites: [],
  weather: {},
};

export interface WeatherReducerType {
  cities: ICityType[];
  favorites: string[];
  weather: IWeatherType;
}

interface ActionCitiesType {
  type: typeof TYPE_SET_WEATHER;
  payload: ICityType[];
}

interface ActionWeatherType {
  type: typeof TYPE_SET_CITIES;
  payload: IWeatherType;
}

interface ActionFavoritesType {
  type: typeof TYPE_SET_FAVORITES;
  payload: string[];
}

export default (
  state = WEATHER_REDUCER_INITIAL_STATE,
  action: ActionCitiesType | ActionFavoritesType | ActionWeatherType,
) => {
  if (action.type === TYPE_SET_CITIES) {
    return { ...state, cities: action.payload };
  }
  if (action.type === TYPE_SET_FAVORITES) {
    return { ...state, favorites: action.payload };
  }
  if (action.type === TYPE_SET_WEATHER) {
    return { ...state, weather: action.payload };
  }
  return state;
};
