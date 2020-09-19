import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { dummyDataCities, dummyDataWeather } from '__mocks__';
import { store } from 'core/Store';

import Home from '../Home.component';

const history = createMemoryHistory();

const getWeatherData = jest.fn();
const getWeatherDataByCity = jest.fn();
const resetList = jest.fn();
const location: any = {};
const match: any = {};

const defaultProps = {
  cities: dummyDataCities,
  favorites: [],
  getWeatherData,
  getWeatherDataByCity,
  history,
  location,
  match,
  resetList,
  weather: { ...dummyDataWeather },
};

/**
 * Mock Google Maps JavaScript API
 */
const window: any = global.window;
const setupGoogleMock = () => {
  const google = {
    maps: {
      places: {
        AutocompleteService: () => {},
        PlacesServiceStatus: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
      },
      Geocoder: () => {},
      GeocoderStatus: {
        ERROR: 'ERROR',
        INVALID_REQUEST: 'INVALID_REQUEST',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
    },
  };
  window.google = google;
  global.window = window;
};
beforeAll(() => {
  setupGoogleMock();
});

const setup = (props = {}) => (
  <Provider store={store}>
    <Router history={history}>
      <Home {...defaultProps} {...props} />
    </Router>
  </Provider>
);

describe('Home', () => {
  it('should be able to click on city', () => {
    const screen = render(setup());
    const element = screen.getAllByTestId('city-details');
    expect(element.length).toBe(1);
  });
});
