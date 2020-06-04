import moment from 'moment';
import { Dispatch } from 'redux';

import axiosInstance from 'core/axios';
import { TYPE_SET_WEATHER } from 'library/common/constants/Store.constants';
import { URLS } from 'library/common/constants/Url.constants';
import { convertKelvinToCelsius } from 'library/utilities';
import { WeatherDailyNetworkType, WeatherHourlyNetworkType, WeatherNetworkType } from './Weather.type';

const LAT = 45.3476046;
const LONG = 14.3917946;

export const getWeatherData = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    const { status, data }: { status: number; data: WeatherNetworkType } = await axiosInstance.get(
      URLS.weatherOneCall(LAT, LONG),
    );
    if (status === 200) {
      const labelsHourly: string[] = [];
      const dataHourly: string[] = [];
      const labelsDaily: string[] = [];
      const dataDailyMin: string[] = [];
      const dataDailyMax: string[] = [];
      const dataDailyDay: string[] = [];
      data.hourly.forEach((day: WeatherHourlyNetworkType) => {
        labelsHourly.push(`${moment.unix(day.dt).format('HH')}h`);
        dataHourly.push(convertKelvinToCelsius(day.temp));
      });
      data.daily.forEach((day: WeatherDailyNetworkType) => {
        labelsDaily.push(`${moment.unix(day.dt).format('DD.MM')}`);
        dataDailyMin.push(convertKelvinToCelsius(day.temp.min));
        dataDailyMax.push(convertKelvinToCelsius(day.temp.max));
        dataDailyDay.push(convertKelvinToCelsius(day.temp.day));
      });
      dispatch({
        type: TYPE_SET_WEATHER,
        payload: {
          current: data.current,
          hourly: { labels: labelsHourly, data: dataHourly },
          daily: { labels: labelsDaily, data: { dataDailyMin, dataDailyMax, dataDailyDay } },
        },
      });
    }
  } catch (e) {
    dispatch({
      type: TYPE_SET_WEATHER,
      payload: {},
    });
  }
};
