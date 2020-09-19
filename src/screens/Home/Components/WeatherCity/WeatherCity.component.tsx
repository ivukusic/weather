import React, { useEffect, useState, SyntheticEvent } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';

import { Loader } from 'library/common/components';
import { convertKelvinToCelsius } from 'library/utilities';
import { IWeatherCityProps } from './WeatherCity.type';

export const WeatherCity = ({
  addRemoveToFavorites,
  getWeatherDataByCity,
  favorites,
  city,
  history,
  isFavorites,
  removeFromList,
  weather,
}: IWeatherCityProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded && (!weather || !weather[city] || !weather[city].city || !weather[city].current)) {
      setLoaded(true);
      getWeatherDataByCity({ city, transformCityName: false, future: true });
    }
  }, [city, getWeatherDataByCity, loaded, weather]);

  const onItemClick = city => (): void => {
    history.push(`/city/${city}`);
  };

  const onHeartClick = (city: string) => (event: SyntheticEvent): void => {
    event.stopPropagation();
    addRemoveToFavorites(city);
  };

  const onRemoveClick = (city: string) => (event: SyntheticEvent): void => {
    event.stopPropagation();
    removeFromList(city);
  };

  const renderCityDetails = (): JSX.Element => {
    if (!weather || !weather[city]) {
      return <Loader />;
    }
    return (
      <>
        <h4 className="mb-0">
          {weather[city].city || city}
          <span className="pl-5">{temp ? convertKelvinToCelsius(temp) : ' - '}&#176;C </span>
        </h4>
        <div className="d-flex align-items-center">
          <div onClick={onHeartClick(city)}>
            {favorites.includes(city) ? (
              <AiFillHeart color="#f3c400" size={34} />
            ) : (
              <AiOutlineHeart color="#f3c400" size={34} />
            )}
          </div>
          {!isFavorites && (
            <div className="cursor-pointer p-2" onClick={onRemoveClick(city)}>
              <GrClose size={20} />
            </div>
          )}
        </div>
      </>
    );
  };

  if (!isFavorites && weather[city] && !weather[city].show) {
    return null;
  }

  const { temp } = (weather[city] && weather[city].current && weather[city].current.main) || {};
  return (
    <div
      className="city-details cursor-pointer d-flex align-items-center justify-content-between mb-2 pt-3 pb-3"
      onClick={onItemClick}
    >
      {renderCityDetails()}
    </div>
  );
};

export default WeatherCity;
