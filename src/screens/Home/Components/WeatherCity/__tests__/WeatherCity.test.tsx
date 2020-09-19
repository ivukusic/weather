import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { dummyDataWeather } from '__mocks__';

import WeatherCity from '../WeatherCity.component';

const city = 'delhi';
const favorites: string[] = [];

const addRemoveToFavorites: any = jest.fn(cityToAdd => {
  favorites.push(cityToAdd);
});
const getWeatherDataByCity = jest.fn();
const removeFromList = jest.fn();
const push = jest.fn();

const history: any = { push };
const location: any = {};
const match: any = {};

const defaultProps = {
  addRemoveToFavorites,
  cities: [],
  favorites,
  city,
  getWeatherDataByCity,
  history,
  isFavorites: false,
  location,
  match,
  removeFromList,
  weather: dummyDataWeather,
};

const setup = (props = {}) => <WeatherCity {...defaultProps} {...props} />;

describe('WeatherCity', () => {
  it('should be able to click on city', () => {
    const screen = render(setup());
    const element = screen.getByTestId('city-details');
    expect(element).toBeTruthy();
    fireEvent.click(element);
    expect(push).toHaveBeenCalled();
  });

  it('should be able to click on remove element from list', () => {
    const screen = render(setup());
    const element = screen.getByTestId('city-details-remove');
    expect(element).toBeTruthy();
    fireEvent.click(element);
    expect(removeFromList).toHaveBeenCalled();
  });

  it('should be able to click and element to favorites', () => {
    const screen = render(setup());
    const element = screen.getByTestId('city-details-favorite-container');
    expect(element).toBeTruthy();
    expect(favorites.length).toBe(0);
    fireEvent.click(element);
    expect(favorites.length).toBe(1);
  });
});
