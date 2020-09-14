import React, { useEffect, useState, SyntheticEvent } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';

import { Button } from 'library/common/components';
import { convertKelvinToCelsius } from 'library/utilities';

import Search from './Components/Search';
import { IWeatherProps } from './Home.type';

import './Home.style.scss';

const Home = ({
  addRemoveToFavorites,
  cities,
  favorites,
  history,
  getWeatherData,
  removeFromList,
  resetList,
  weather,
}: IWeatherProps): JSX.Element => {
  const [{ loaded, reset }, setState] = useState({ loaded: false, reset: false });

  useEffect(() => {
    getWeatherData();
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   console.log('Latitude is :', position.coords.latitude);
    //   console.log('Longitude is :', position.coords.longitude);
    // });
  }, [getWeatherData]);

  useEffect(() => {
    if (!loaded && weather && Object.keys(weather).length) {
      let reset = false;
      Object.keys(weather).forEach(key => {
        if (!weather[key].show) {
          reset = true;
        }
      });
      setState({ loaded: true, reset });
    }
  }, [loaded, weather]);

  const onItemClick = city => () => {
    history.push(`/city/${city}`);
  };

  const onHeartClick = (city: string) => (event: SyntheticEvent) => {
    event.stopPropagation();
    addRemoveToFavorites(city);
  };

  const onRemoveClick = (city: string) => (event: SyntheticEvent) => {
    event.stopPropagation();
    if (!reset) {
      setState({ loaded: true, reset: true });
    }
    removeFromList(city);
  };

  const onResetClick = () => {
    setState({ loaded: true, reset: false });
    resetList();
  };

  const renderItems = (items, isFavorites) =>
    items.map((item: any) => {
      const { accentcity, city } = item.fields;
      const { temp } = (weather[city] && weather[city].current && weather[city].current.main) || {};
      if (!isFavorites && weather[city] && !weather[city].show) {
        return null;
      }
      return (
        <div
          key={item.recordid}
          className="city-details d-flex align-items-center justify-content-between mb-2 pt-3 pb-3"
          onClick={onItemClick(city)}
        >
          <h4 className="mb-0">
            {accentcity}
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
        </div>
      );
    });

  return (
    <>
      <Search />
      <div className="container pt-3 pb-5">
        {!!favorites.length && (
          <div className="home_weather mt-2">
            <h1 className="title">Favorites</h1>
            <h5 className="subtitle mb-4">Favorite cities</h5>
            {renderItems(
              cities.filter(item => favorites.includes(item.fields.city)),
              true,
            )}
          </div>
        )}
        <div className="home_weather mt-5">
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <h1 className="title">Current weather</h1>
              <h5 className="subtitle mb-4">Largest cities by population</h5>
            </div>
            {reset && <Button className="mb-4" label="Reset" onClick={onResetClick} />}
          </div>
          {renderItems(cities, false)}
        </div>
      </div>
    </>
  );
};

export default Home;
