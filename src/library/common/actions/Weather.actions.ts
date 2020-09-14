import Axios from 'axios';

import axiosInstance from 'core/axios';
import { TYPE_SET_CITIES, TYPE_SET_FAVORITES, TYPE_SET_WEATHER } from 'library/common/constants/Store.constants';
import { URLS } from 'library/common/constants/Url.constants';

const getCities = () => async (dispatch, getState): Promise<any> => {
  try {
    const { data }: { status: number; data: any } = await Axios.get(
      'https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q=&rows=15&sort=population&facet=country',
    );
    const cities = data.records.sort((a, b) => {
      if (a.fields.city < b.fields.city) {
        return -1;
      }
      if (a.fields.city > b.fields.city) {
        return 1;
      }
      return 0;
    });
    dispatch({ type: TYPE_SET_CITIES, payload: cities });
    return cities;
  } catch (e) {
    return [];
  }
};

export const getWeatherData = () => async (dispatch, getState): Promise<void> => {
  let { cities } = getState().weatherReducer;
  if (!cities || !cities.length) {
    cities = await dispatch(getCities());
  }
  for (let i = 0; i < cities.length; i++) {
    let { weather } = getState().weatherReducer;
    if (!weather[cities[i].fields.city]) {
      const city = cities[i].fields.city;
      const { success, data } = await dispatch(getWeatherDataByCity(cities[i].fields.city));
      if (success) {
        weather = {
          ...weather,
          [city]: {
            ...weather[city],
            current: { ...((weather[city] && weather[city].current) || {}), ...data.current },
            show: weather[city] && weather[city].hasOwnProperty('show') ? weather[city].show : true,
          },
        };
        dispatch({ type: TYPE_SET_WEATHER, payload: weather });
      }
    }
  }
};

export const getWeatherDataByCity = (city: string, save: boolean = false, future: boolean = false) => async (
  dispatch,
  getState,
): Promise<any> => {
  try {
    const { status, data: current }: { status: number; data: any } = await axiosInstance.get(
      `${URLS.weatherCity(city)}`,
    );
    let weekForecast = {};
    if (future) {
      const { status, data }: { status: number; data: any } = await axiosInstance.get(`${URLS.weatherCityWeek(city)}`);
      if (status === 200) {
        weekForecast = data;
      }
    }
    if (save) {
      let { weather } = getState().weatherReducer;
      weather = {
        ...weather,
        [city]: {
          ...(weather[city] || {}),
          current,
          weekForecast,
          show: weather[city].hasOwnProperty('show') ? weather[city].show : true,
        },
      };
      dispatch({ type: TYPE_SET_WEATHER, payload: weather });
    }
    return { success: status === 200, data: { current, weekForecast } };
  } catch (e) {
    return { success: false };
  }
};

export const saveNotes = (city: string, note: string) => async (dispatch, getState): Promise<any> => {
  let { weather } = getState().weatherReducer;
  weather = { ...weather, [city]: { ...(weather[city] || {}), note } };
  dispatch({ type: TYPE_SET_WEATHER, payload: weather });
};

export const addRemoveToFavorites = (city: string) => async (dispatch, getState): Promise<any> => {
  const { favorites } = getState().weatherReducer;
  if (favorites && favorites.includes(city)) {
    favorites.splice(favorites.indexOf(city), 1);
  } else {
    favorites.push(city);
  }
  dispatch({ type: TYPE_SET_FAVORITES, payload: [...favorites] });
};

export const removeFromList = (city: string) => async (dispatch, getState): Promise<void> => {
  let { weather } = getState().weatherReducer;
  weather = { ...weather, [city]: { ...(weather[city] || {}), show: false } };
  dispatch({ type: TYPE_SET_WEATHER, payload: weather });
};

export const resetList = () => (dispatch, getState): void => {
  const { cities } = getState().weatherReducer;
  let { weather } = getState().weatherReducer;
  cities.forEach(city => {
    const name = city.fields.city;
    weather = { ...weather, [name]: { ...weather[name], show: true } };
  });
  dispatch({ type: TYPE_SET_WEATHER, payload: weather });
};
