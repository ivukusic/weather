import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useParams, Link } from 'react-router-dom';

import { TextArea } from 'library/common/components';
import { convertKelvinToCelsius } from 'library/utilities';
import { ICityTypeProps } from './City.type';

import './City.style.scss';
import { IWeatherDayType } from 'library/types';

const City = ({
  addRemoveToFavorites,
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

  const onNotesChange = (event: any): void => {
    saveNotes(city, event.target.value);
  };

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
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
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

  const renderNotes = (): JSX.Element => (
    <TextArea className="mt-5" placeholder="Add notes..." onChange={onNotesChange} value={currentWeather.note || ''} />
  );

  if (!currentWeather) {
    return null;
  }
  return (
    <div className="container">
      <Link className="arrow-link" to="/">
        <BsArrowLeft className="mt-4" size="60" />
      </Link>
      <div className="city-details d-flex">
        <img
          src={`http://openweathermap.org/img/wn/${currentWeather?.current?.weather[0].icon}@2x.png`}
          alt="Weather - city details"
        />
        <div className="d-flex flex-grow-1 pt-3">
          <div className="d-flex flex-column">
            <h1 className="title mb-0">
              {currentWeather?.city}
              <span className="pl-5 mb-2">{convertKelvinToCelsius(currentWeather?.current?.main.temp)}&#176;C</span>
            </h1>
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
      {renderNotes()}
    </div>
  );
};

export default City;
