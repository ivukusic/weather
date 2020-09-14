import React, { useEffect } from 'react';

import { convertKelvinToCelsius } from 'library/utilities';

import Search from './Components/Search';
import { IWeatherProps } from './Home.type';

import './Home.style.scss';

const Home = ({ cities, history, getWeatherData, weather }: IWeatherProps): JSX.Element => {
  useEffect(() => {
    getWeatherData();
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   console.log('Latitude is :', position.coords.latitude);
    //   console.log('Longitude is :', position.coords.longitude);
    // });
  }, [getWeatherData]);

  const onItemClick = city => () => {
    history.push(`/city/${city}`);
  };

  return (
    <>
      <Search />
      <div className="container pt-3 pb-5">
        <div className="home_weather mt-2">
          <h1 className="title">Current weather</h1>
          <h5 className="subtitle mb-4">Largest cities by population</h5>
          {cities.map((item: any) => {
            const { fields, recordid } = item;
            const { accentcity, city } = fields;
            return (
              <div key={recordid} className="home_weather_city" onClick={onItemClick(city)}>
                <div className="mb-0">{accentcity}</div>
                <div className="home_weather_city_temperature">
                  {convertKelvinToCelsius(weather[city]?.current?.main.temp)}&#176;C
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
