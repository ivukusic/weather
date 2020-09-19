import { dummyDataCities, dummyDataFavorites, dummyDataWeather } from '__mocks__';
import { TYPE_SET_CITIES, TYPE_SET_FAVORITES, TYPE_SET_WEATHER } from 'library/common/constants/Store.constants';

import weatherReducer, { WEATHER_REDUCER_INITIAL_STATE } from '../Weather.reducer';

describe('Weather reducer', () => {
  it('should return the initial state', () => {
    const action: any = {};
    expect(weatherReducer(WEATHER_REDUCER_INITIAL_STATE, action)).toEqual({ ...WEATHER_REDUCER_INITIAL_STATE });
  });

  it('should handle TYPE_SET_CITIES', () => {
    let action: any = {};
    action = {
      type: TYPE_SET_CITIES,
      payload: dummyDataCities,
    };
    expect(weatherReducer(WEATHER_REDUCER_INITIAL_STATE, action)).toEqual({
      ...WEATHER_REDUCER_INITIAL_STATE,
      cities: dummyDataCities,
    });
  });

  it('should handle TYPE_SET_FAVORITES', () => {
    let action: any = {};
    action = {
      type: TYPE_SET_FAVORITES,
      payload: dummyDataFavorites,
    };
    expect(weatherReducer(WEATHER_REDUCER_INITIAL_STATE, action)).toEqual({
      ...WEATHER_REDUCER_INITIAL_STATE,
      favorites: dummyDataFavorites,
    });
  });

  it('should handle TYPE_SET_WEATHER', () => {
    let action: any = {};
    action = {
      type: TYPE_SET_WEATHER,
      payload: dummyDataWeather,
    };
    expect(weatherReducer(WEATHER_REDUCER_INITIAL_STATE, action)).toEqual({
      ...WEATHER_REDUCER_INITIAL_STATE,
      weather: dummyDataWeather,
    });
  });
});
