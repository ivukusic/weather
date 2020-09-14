import React, { useEffect } from 'react';

import { convertKelvinToCelsius } from 'library/utilities';

import Search from './Components/Search';
import { IWeatherProps } from './Home.type';

import './Home.style.scss';

const Home = ({ getWeatherData, weather }: IWeatherProps): JSX.Element => {
  useEffect(() => {
    getWeatherData();
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   console.log('Latitude is :', position.coords.latitude);
    //   console.log('Longitude is :', position.coords.longitude);
    // });
  }, [getWeatherData]);

  return (
    <div className="">
      <Search />
      <div className="container pt-3 pb-5">
        <div className="home_weather mt-5">
          <h2>Current weather</h2>
          <h5>Favorite cities</h5>
        </div>
        <div className="home_weather mt-5">
          <h2>Current weather</h2>
          <h5>Largest cities by population</h5>
          {Object.keys(weather).map(city => (
            <div key={city} className="home_weather_city">
              <div className="mb-0">{city}</div>
              <div className="home_weather_city_temperature">
                {convertKelvinToCelsius(weather[city]?.main.temp)}&#176;C
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
