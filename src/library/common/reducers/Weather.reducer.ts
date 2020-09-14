import { TYPE_SET_CITIES, TYPE_SET_WEATHER } from 'library/common/constants/Store.constants';
import { WeatherType } from 'library/types/Weather.types';

export const WEATHER_REDUCER_INITIAL_STATE = {
  cities: [],
  weather: {},
};

export interface WeatherReducerType {
  weather: WeatherType;
}

interface ActionCitiesType {
  type: typeof TYPE_SET_WEATHER;
  payload: any;
}

interface ActionWeatherType {
  type: typeof TYPE_SET_CITIES;
  payload: WeatherType;
}

export default (state = WEATHER_REDUCER_INITIAL_STATE, action: ActionCitiesType | ActionWeatherType) => {
  if (action.type === TYPE_SET_CITIES) {
    return { ...state, cities: action.payload };
  }
  if (action.type === TYPE_SET_WEATHER) {
    return { ...state, weather: action.payload };
  }
  return state;
};
