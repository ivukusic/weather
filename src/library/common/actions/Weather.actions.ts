import Axios from 'axios';

import axiosInstance from 'core/axios';
import { TYPE_SET_CITIES, TYPE_SET_FAVORITES, TYPE_SET_WEATHER } from 'library/common/constants/Store.constants';
import { URLS } from 'library/common/constants/Url.constants';
import { camelCase } from 'library/utilities';

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
    const { weather } = getState().weatherReducer;
    if (!weather[cities[i].fields.city]) {
      await dispatch(getWeatherDataByCity(cities[i].fields.city));
    }
  }
};

export const getWeatherDataByCity = (
  city: string,
  transformCityName: boolean = false,
  future: boolean = false,
) => async (dispatch, getState): Promise<any> => {
  try {
    let cityString = city.toLowerCase();
    const { status, data: current }: { status: number; data: any } = await axiosInstance.get(
      `${URLS.weatherCity(city)}`,
    );
    cityString = (transformCityName ? current.name : city).toLowerCase();
    let { weather } = getState().weatherReducer;
    if (status === 200) {
      let weekForecast = {};
      if (future) {
        const { status, data }: { status: number; data: any } = await axiosInstance.get(
          `${URLS.weatherCityWeek(cityString)}`,
        );
        if (status === 200) {
          weekForecast = data;
        }
      }
      weather = {
        ...weather,
        [cityString]: {
          ...(weather[cityString] || {}),
          city: camelCase(cityString),
          current,
          weekForecast,
          show: weather[cityString] && weather[cityString].hasOwnProperty('show') ? weather[cityString].show : true,
        },
      };
      dispatch({ type: TYPE_SET_WEATHER, payload: weather });
    }
    return { success: status === 200, data: { weather, city: cityString } };
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
