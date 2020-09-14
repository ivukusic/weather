import moment from 'moment';
import React, { useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useParams, Link } from 'react-router-dom';

import { TextArea } from 'library/common/components';
import { convertKelvinToCelsius } from 'library/utilities';
import { ICityProps } from './City.type';

import './City.style.scss';

const City = ({ getWeatherDataByCity, saveNotes, weather }: ICityProps): JSX.Element | null => {
  const { city } = useParams<{ city: string }>();

  const currentWeather = weather[city];

  useEffect(() => {
    if (!weather[city] || !weather[city].weekForecast) {
      getWeatherDataByCity(city, true, true);
    }
  }, [city, getWeatherDataByCity, weather]);

  const onNotesChange = (event: any) => {
    saveNotes(city, event.target.value);
  };

  const onHeartClick = () => {};

  const renderWeekForecast = () => {
    if (currentWeather?.weekForecast?.list) {
      return (
        <div className="overflow-auto w-100 mt-5">
          <div className="d-flex week-forecast">
            {currentWeather?.weekForecast?.list.map(item => (
              <div key={item.dt} className="week-forecast_item mr-2">
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="Weather - city details"
                />
                <div className="d-flex flex-column align-items-center">
                  <span>{moment.unix(item.dt).format('dddd')}</span>
                  <span>{moment.unix(item.dt).format('DD/MM')}</span>
                </div>
              </div>
            ))}
          </div>
          <span>Scroll to see rest of the forecast</span>
          <BsArrowRight />
        </div>
      );
    }
    return null;
  };

  const renderNotes = () => (
    <TextArea className="mt-5" placeholder="Add notes..." onChange={onNotesChange} value={currentWeather.note || ''} />
  );

  if (!currentWeather) {
    return null;
  }
  const isFavorite = true;
  return (
    <div className="container">
      <Link className="arrow-link" to="/">
        <BsArrowLeft className="mt-4" size="60" />
      </Link>
      <div className="d-flex">
        <img
          src={`http://openweathermap.org/img/wn/${currentWeather?.current?.weather[0].icon}@2x.png`}
          alt="Weather - city details"
        />
        <div className="d-flex flex-grow-1 pt-3">
          <div className="d-flex flex-column">
            <h1 className="title mb-0">
              {currentWeather?.current?.name}
              <span className="pl-5 mb-2">{convertKelvinToCelsius(currentWeather?.current?.main.temp)}&#176;C</span>
            </h1>
            <h5 className="subtitle mb-0">
              {currentWeather?.current?.weather[0].main} - {currentWeather?.current?.weather[0].description}
            </h5>
            <span>Feels like: {convertKelvinToCelsius(currentWeather?.current?.main.feels_like)}&#176;C</span>
          </div>
          <div className="ml-5" onClick={onHeartClick}>
            {isFavorite ? <AiFillHeart size={44} /> : <AiOutlineHeart size={44} />}
          </div>
        </div>
      </div>
      {renderWeekForecast()}
      {renderNotes()}
    </div>
  );
};

export default City;
