import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useParams, Link } from 'react-router-dom';

import { IWeatherDayType } from 'library/types';
import { convertKelvinToCelsius } from 'library/utilities';
import { ICityTypeProps } from './City.type';
import Notes from './Components/Notes';

import './City.style.scss';

const City = ({
  addRemoveToFavorites,
  deleteNote,
  favorites,
  getWeatherDataByCity,
  saveNotes,
  weather,
}: ICityTypeProps): JSX.Element | null => {
  let { city } = useParams<{ city: string }>();
  city = city.toLowerCase();

  const [loaded, setLoaded] = useState<boolean>(false);

  const currentWeather = weather[city];

  useEffect(() => {
    if ((!weather[city] || !weather[city].weekForecast || !Object.keys(weather[city].weekForecast).length) && !loaded) {
      setLoaded(true);
      getWeatherDataByCity({ city, future: true });
    }
  }, [city, getWeatherDataByCity, loaded, weather]);

  const onHeartClick = (): void => {
    addRemoveToFavorites(city);
  };

  const renderWeekForecast = (): JSX.Element | null => {
    if (currentWeather?.weekForecast?.list) {
      return (
        <div className="overflow-auto w-100 mt-5">
          <div className="d-flex week-forecast">
            {currentWeather?.weekForecast?.list.map(
              (item: IWeatherDayType): JSX.Element => (
                <div key={item.dt} className="week-forecast_item mr-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt="Weather - city details"
                  />
                  <div className="d-flex flex-column align-items-center">
                    <span>{moment.unix(item.dt).format('dddd')}</span>
                    <span>{moment.unix(item.dt).format('DD/MM')}</span>
                  </div>
                </div>
              ),
            )}
          </div>
          <span className="week-forecast_scroll-text">Scroll to see rest of the forecast</span>
          <BsArrowRight />
        </div>
      );
    }
    return null;
  };

  if (!currentWeather) {
    return null;
  }
  return (
    <div className="container pb-4">
      <Link className="arrow-link" to="/">
        <BsArrowLeft className="mt-4" size="60" />
      </Link>
      <div className="city-details d-flex flex-column flex-sm-row align-items-start">
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather?.current?.weather[0].icon}@2x.png`}
          alt="Weather - city details"
        />
        <div className="d-flex flex-grow-1 pt-3">
          <div className="d-flex flex-column">
            <div className="d-flex flex-column flex-sm-row">
              <h1 className="title">{currentWeather?.city}</h1>
              <h1 className="title title--no-line ml-sm-5">
                {convertKelvinToCelsius(currentWeather?.current?.main.temp)}&#176;C
              </h1>
            </div>
            <h5 className="subtitle mb-0">
              {currentWeather?.current?.weather[0].main} - {currentWeather?.current?.weather[0].description}
            </h5>
            <span>Feels like: {convertKelvinToCelsius(currentWeather?.current?.main.feels_like)}&#176;C</span>
          </div>
          <div className="ml-5" onClick={onHeartClick}>
            {favorites.includes(city) ? (
              <AiFillHeart color="#f3c400" size={44} />
            ) : (
              <AiOutlineHeart color="#f3c400" size={44} />
            )}
          </div>
        </div>
      </div>
      {renderWeekForecast()}
      <Notes city={city} deleteNote={deleteNote} notes={currentWeather.notes} saveNotes={saveNotes} />
    </div>
  );
};

export default City;
