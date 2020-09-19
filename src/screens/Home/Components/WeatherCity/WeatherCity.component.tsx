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
    if (
      !loaded &&
      isFavorites &&
      (!weather[city] || !weather[city].city || !weather[city].current) &&
      weather &&
      Object.keys(weather).length
    ) {
      setLoaded(true);
      getWeatherDataByCity({ city, transformCityName: false, future: true });
    }
  }, [city, getWeatherDataByCity, isFavorites, loaded, weather]);

  const onItemClick = (): void => {
    history.push(`/city/${city}`);
  };

  const onHeartClick = (event: SyntheticEvent): void => {
    event.stopPropagation();
    addRemoveToFavorites(city);
  };

  const onRemoveClick = (event: SyntheticEvent): void => {
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
          <div onClick={onHeartClick} data-testid="city-details-favorite-container">
            {favorites.includes(city) ? (
              <AiFillHeart data-testid={`city-details-${city}-favorite`} color="#f3c400" size={34} />
            ) : (
              <AiOutlineHeart data-testid={`city-details-${city}-not-favorite`} color="#f3c400" size={34} />
            )}
          </div>
          {!isFavorites && (
            <div className="cursor-pointer p-2" onClick={onRemoveClick} data-testid="city-details-remove">
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
      data-testid="city-details"
    >
      {renderCityDetails()}
    </div>
  );
};

export default WeatherCity;
