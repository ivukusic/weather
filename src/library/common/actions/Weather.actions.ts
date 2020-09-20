import Axios from 'axios';
import moment from 'moment';

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
  /**
   * CHECKS IF CITIES ALREADY FETCHED
   * if we have cities in our already fetched data, no need to do it again
   */
  if (!cities || !cities.length) {
    cities = await dispatch(getCities());
  }
  for (let i = 0; i < cities.length; i++) {
    const { weather } = getState().weatherReducer;
    /**
     * CHECKS TO MINIMIZE NETWORK REQUEST
     * no need to fetch weather for that city if data was fetched within last 60 minutes
     * 1. check if city weather does not exist in weather object
     * 2. check if city current weather does not exist in weather object
     * 3. check if city weather was fetched within more then 60 minutes
     */
    if (
      !weather[cities[i].fields.city] ||
      !weather[cities[i].fields.city].current ||
      (weather[cities[i].fields.city].current.dt &&
        moment().diff(moment.unix(weather[cities[i].fields.city].current.dt)) / 1000 / 60 > 10)
    ) {
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

export const saveNotes = (city: string, note: string, index?: number | null) => async (
  dispatch,
  getState,
): Promise<void> => {
  let { weather } = getState().weatherReducer;
  const notes = (weather[city] && weather[city].notes) || [];
  if (index !== null && typeof index === 'number' && notes[index]) {
    notes[index] = note;
  } else {
    notes.push(note);
  }
  weather = { ...weather, [city]: { ...(weather[city] || {}), notes } };
  dispatch({ type: TYPE_SET_WEATHER, payload: weather });
};

export const deleteNote = (city: string, index: number) => async (dispatch, getState): Promise<void> => {
  let { weather } = getState().weatherReducer;
  const notes = (weather[city] && weather[city].notes) || [];
  if (notes[index]) {
    notes.splice(index, 1);
  }
  weather = { ...weather, [city]: { ...(weather[city] || {}), notes } };
  dispatch({ type: TYPE_SET_WEATHER, payload: weather });
};

export const addRemoveToFavorites = (city: string) => async (dispatch, getState): Promise<void> => {
  const { favorites } = getState().weatherReducer;
  if (favorites && favorites.includes(city)) {
    favorites.splice(favorites.indexOf(city), 1);
  } else {
    favorites.push(city);
    favorites.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
  }
  dispatch({ type: TYPE_SET_FAVORITES, payload: [...favorites] });
};

export const removeFromList = (city: string) => async (dispatch, getState): Promise<void> => {
  let { weather } = getState().weatherReducer;
  weather = { ...weather, [city]: { ...(weather[city] || {}), show: false } };
  dispatch({ type: TYPE_SET_WEATHER, payload: weather });
};
