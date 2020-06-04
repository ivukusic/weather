import { TYPE_SET_WEATHER } from 'library/common/constants/Store.constants';
import { WeatherType } from './Weather.type';

export const WEATHER_REDUCER_INITIAL_STATE = {
  weather: null,
};

export interface WeatherReducerType {
  weather: WeatherType;
}

interface ActionType {
  type: typeof TYPE_SET_WEATHER;
  payload: WeatherType;
}

export default (state = WEATHER_REDUCER_INITIAL_STATE, action: ActionType) => {
  if (action.type === TYPE_SET_WEATHER) {
    return { ...state, weather: action.payload };
  }
  return state;
};
