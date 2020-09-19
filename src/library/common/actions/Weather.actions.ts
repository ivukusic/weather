import Axios from 'axios';

import { TYPE_SET_CITIES, TYPE_SET_FAVORITES, TYPE_SET_WEATHER } from 'library/common/constants/Store.constants';
import { URLS } from 'library/common/constants/Url.constants';
import { ICityType, IWeatherType } from 'library/types';
import { camelCase } from 'library/utilities';

export const getCities = () => async (dispatch): Promise<ICityType[]> => {
  try {
    const { status, data } = await Axios.get(URLS.getCities);
    if (status === 200 && data.records && data.records.length) {
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
    }
    return [];
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
    if (!weather[cities[i].fields.city] || !weather[cities[i].fields.city].current) {
      await dispatch(getWeatherDataByCity({ city: cities[i].fields.city }));
    }
  }
};

export const getWeatherDataByCity = ({
  city,
  lat,
  long,
  transformCityName = false,
  future = false,
}: {
  city?: string;
  lat?: number;
  long?: number;
  transformCityName?: boolean;
  future?: boolean;
}) => async (dispatch, getState): Promise<{ success: boolean; data?: { city: string; weather: IWeatherType } }> => {
  try {
    let cityString = (city && city.toLowerCase()) || '';
    let urlWeather = '';
    let urlForecast = '';
    if (city) {
      urlWeather = `${URLS.weatherCity(city)}`;
      urlForecast = `${URLS.weatherCityWeek(cityString)}`;
    } else if (lat && long) {
      urlWeather = `${URLS.weatherLatLong(lat, long)}`;
      urlForecast = `${URLS.weatherLatLongWeek(lat, long)}`;
    }
    const { status, data: current } = await Axios.get(urlWeather);
    cityString = (transformCityName || !cityString ? current.name : city).toLowerCase();
    let { weather } = getState().weatherReducer;
    if (status === 200) {
      let weekForecast = {};
      if (future) {
        const { status, data } = await Axios.get(urlForecast);
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

export const saveNotes = (city: string, note: string) => async (dispatch, getState): Promise<void> => {
  let { weather } = getState().weatherReducer;
  weather = { ...weather, [city]: { ...(weather[city] || {}), note } };
  dispatch({ type: TYPE_SET_WEATHER, payload: weather });
};

export const addRemoveToFavorites = (city: string) => async (dispatch, getState): Promise<void> => {
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
