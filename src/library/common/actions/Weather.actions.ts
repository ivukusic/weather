import Axios from 'axios';

import axiosInstance from 'core/axios';
import { TYPE_SET_CITIES, TYPE_SET_WEATHER } from 'library/common/constants/Store.constants';
import { URLS } from 'library/common/constants/Url.constants';

const getCities = () => async (dispatch, getState): Promise<any> => {
  try {
    const { data }: { status: number; data: any } = await Axios.get(
      'https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q=&rows=15&sort=population&facet=country',
    );
    dispatch({
      type: TYPE_SET_CITIES,
      payload: data.records,
    });
    return data.records;
  } catch (e) {
    return [];
  }
};

export const getWeatherData = () => async (dispatch, getState): Promise<void> => {
  let { cities, weather } = getState().weatherReducer;
  if (!cities || !cities.length) {
    cities = await dispatch(getCities());
    cities = cities.sort((a, b) => {
      if (a.fields.accentcity < b.fields.accentcity) {
        return -1;
      }
      if (a.fields.accentcity > b.fields.accentcity) {
        return 1;
      }
      return 0;
    });
  }
  for (let i = 0; i < cities.length; i++) {
    if (!weather[cities[i].fields.accentcity]) {
      try {
        const url = `${URLS.weatherCity(cities[i].fields.accentcity)}`;
        const { status, data }: { status: number; data: any } = await axiosInstance.get(url);
        if (status === 200) {
          weather = { ...weather, [cities[i].fields.accentcity]: data };
          dispatch({
            type: TYPE_SET_WEATHER,
            payload: weather,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
