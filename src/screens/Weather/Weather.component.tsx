import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import { Loader } from 'library/common/components';
import { convertKelvinToCelsius } from 'library/utilities';
import { WeatherDailyType, WeatherHourlyType, WeatherType } from './Weather.type';

const dataHourly = ({ labels, data }: WeatherHourlyType) => ({
  labels,
  datasets: [
    {
      data,
      label: 'Temperature by hours',
      fill: false,
      borderColor: '#742774',
    },
  ],
});

const dataDaily = ({ labels, data }: WeatherDailyType) => ({
  labels,
  datasets: [
    {
      label: 'Min temp',
      data: data.dataDailyMin,
      fill: false,
      borderColor: 'blue',
    },
    {
      label: 'Temperature',
      data: data.dataDailyDay,
      fill: false,
      borderColor: 'green',
    },
    {
      label: 'Max temp',
      data: data.dataDailyMax,
      fill: false,
      borderColor: 'red',
    },
  ],
});

interface WeatherProps {
  getWeatherData: () => {};
  weather: WeatherType;
}

const Weather = ({ getWeatherData, weather }: WeatherProps): JSX.Element => {
  useEffect(() => {
    if (!weather) {
      getWeatherData();
    }
  }, [getWeatherData, weather]);

  const renderCurrentWeather = (): JSX.Element => (
    <div className="d-flex flex-column flex-grow-1">
      <div className="font-weight-bold">{weather.current.weather[0].main}</div>
      <div>-{weather.current.weather[0].description}</div>
      <div className="mt-3">
        <span className="font-weight-bold">Pressure: </span>
        <span>{weather.current.pressure}</span>
      </div>
      <div>
        <span className="font-weight-bold">Humidity: </span>
        <span>{weather.current.humidity}</span>
      </div>
      <div>
        <span className="font-weight-bold">Temp: </span>
        <span>{convertKelvinToCelsius(weather.current.temp)} &#8451;</span>
      </div>
    </div>
  );

  return (
    <div className="container-fluid d-flex flex-grow-1 flex-column justify-content-center pt-3">
      {!weather && (
        <div className="d-flex flex-grow-1 align-items-center justify-content-center">
          <Loader />
        </div>
      )}
      {weather && weather.current && renderCurrentWeather()}
      {weather && (
        <div className="row mt-3">
          {weather.daily && (
            <div className="col col-12 col-md-6 mb-5">
              <Line data={dataDaily(weather.daily)} />
            </div>
          )}
          {weather.hourly && (
            <div className="col col-12 col-md-6 mb-5">
              <Line data={dataHourly(weather.hourly)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
