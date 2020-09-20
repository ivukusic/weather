import React, { useEffect } from 'react';

import Search from './Components/Search';
import WeatherCity from './Components/WeatherCity';
import { IWeatherProps } from './Home.type';

import './Home.style.scss';

const Home = ({ cities, favorites, history, getWeatherData, getWeatherDataByCity }: IWeatherProps): JSX.Element => {
  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);

  const onSearchSelect = async ({ city, lat, long }: { city?: string; lat?: number; long?: number }) => {
    const { success, data } = await getWeatherDataByCity({ city, lat, long, transformCityName: true, future: true });
    if (success && data) {
      history.push(`/city/${data.city}`);
    }
    return { success };
  };

  const renderItems = (items, isFavorites): JSX.Element =>
    items.map((item: any) => {
      let city = item;
      if (item.fields) {
        city = item.fields.city;
      }
      return <WeatherCity key={item.recordid || item} city={city} isFavorites={isFavorites} />;
    });

  return (
    <>
      <Search onSelect={onSearchSelect} />
      <div className="container pt-3 pb-5">
        {!!favorites.length && (
          <div className="home_weather mt-2">
            <h1 className="title">Favorites</h1>
            <h5 className="subtitle mb-4">Favorite cities</h5>
            {renderItems(favorites, true)}
          </div>
        )}
        <div className="home_weather mt-5">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end">
            <div>
              <h1 className="title">Current weather</h1>
              <h5 className="subtitle mb-4">Largest cities by population</h5>
            </div>
          </div>
          {renderItems(cities, false)}
        </div>
      </div>
    </>
  );
};

export default Home;
