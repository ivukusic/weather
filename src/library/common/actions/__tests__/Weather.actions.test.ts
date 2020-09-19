import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { dummyDataCities, dummyDataFavorites, dummyDataWeather } from '__mocks__';
import { TYPE_SET_CITIES, TYPE_SET_WEATHER } from 'library/common/constants/Store.constants';
import { WEATHER_REDUCER_INITIAL_STATE } from 'library/common/reducers/Weather.reducer';

import { getCities, getWeatherData, getWeatherDataByCity } from '../Weather.actions';

jest.mock('axios');
const mockedAxios: any = axios as jest.Mocked<typeof axios>;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

describe('Weather actions', () => {
  let store;
  const city = 'delhi';

  beforeEach(() => {
    store = mockStore({});
  });

  describe('getCities', () => {
    it('getCities should dispatch action on success and status 200 - return cities data', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: {
          records: [
            dummyDataCities[0],
            {
              ...dummyDataCities[0],
              fields: { ...dummyDataCities[0].fields, accentcity: 'New York', city: 'new york' },
            },
            {
              ...dummyDataCities[0],
              fields: { ...dummyDataCities[0].fields, accentcity: 'Adelaide', city: 'adelaide' },
            },
          ],
        },
      });
      const res = await store.dispatch(getCities());
      const actions = store.getActions();
      const expectedCities = [
        { ...dummyDataCities[0], fields: { ...dummyDataCities[0].fields, accentcity: 'Adelaide', city: 'adelaide' } },
        dummyDataCities[0],
        { ...dummyDataCities[0], fields: { ...dummyDataCities[0].fields, accentcity: 'New York', city: 'new york' } },
      ];
      expect(actions[0]).toEqual({ type: TYPE_SET_CITIES, payload: expectedCities });
      expect(res).toEqual(expectedCities);
    });

    it('getCities should not dispatch action on success and status 201 - return cities data as empty array', async () => {
      mockedAxios.get.mockResolvedValue({ status: 201, data: { records: dummyDataCities } });
      const res = await store.dispatch(getCities());
      const actions = store.getActions();
      expect(actions.length).toBe(0);
      expect(res).toEqual([]);
    });

    it('getCities should not dispatch action on error - return cities data as empty array', async () => {
      mockedAxios.get.mockRejectedValue({ status: 400 });
      const res = await store.dispatch(getCities());
      const actions = store.getActions();
      expect(actions.length).toBe(0);
      expect(res).toEqual([]);
    });
  });

  describe('getWeatherData', () => {
    it('getWeatherData should dispatch action on success and status 200 - return weather data', async () => {
      store = mockStore({
        weatherReducer: {
          ...WEATHER_REDUCER_INITIAL_STATE,
          cities: dummyDataCities,
        },
      });
      const city = 'delhi';
      mockedAxios.get.mockResolvedValue({ status: 200, data: dummyDataWeather[city].current });
      await store.dispatch(getWeatherData());
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: TYPE_SET_WEATHER, payload: dummyDataWeather });
    });
  });

  describe('getWeatherDataByCity', () => {
    it(
      'getWeatherDataByCity should dispatch action on success and status 200 - return weather city weather' +
        'data without weekly forecast',
      async () => {
        store = mockStore({
          weatherReducer: {
            ...WEATHER_REDUCER_INITIAL_STATE,
            cities: dummyDataCities,
          },
        });
        mockedAxios.get.mockResolvedValue({ status: 200, data: dummyDataWeather[city].current });
        const res = await store.dispatch(getWeatherDataByCity({ city }));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: TYPE_SET_WEATHER, payload: dummyDataWeather });
        expect(res).toEqual({ success: true, data: { weather: dummyDataWeather, city } });
      },
    );

    it(
      'getWeatherDataByCity should dispatch action on success and status 200 - return weather city weather' +
        'data without weekly forecast by latitude and longitude',
      async () => {
        store = mockStore({
          weatherReducer: {
            ...WEATHER_REDUCER_INITIAL_STATE,
            cities: dummyDataCities,
          },
        });
        mockedAxios.get.mockResolvedValue({ status: 200, data: dummyDataWeather[city].current });
        const res = await store.dispatch(
          getWeatherDataByCity({ lat: 19.01, long: 72.85, transformCityName: true, future: true }),
        );
        const actions = store.getActions();
        const expectedWeather = {
          ...dummyDataWeather,
          [city]: {
            ...dummyDataWeather[city],
            weekForecast: dummyDataWeather[city].current,
          },
        };
        expect(actions[0]).toEqual({ type: TYPE_SET_WEATHER, payload: expectedWeather });
        expect(res).toEqual({ success: true, data: { weather: expectedWeather, city } });
      },
    );

    it('getWeatherDataByCity should not dispatch action on reject - return weather data', async () => {
      store = mockStore({
        weatherReducer: {
          ...WEATHER_REDUCER_INITIAL_STATE,
          cities: dummyDataCities,
        },
      });
      mockedAxios.get.mockRejectedValue({ status: 400 });
      const res = await store.dispatch(getWeatherDataByCity({ city }));
      const actions = store.getActions();
      expect(actions.length).toBe(0);
      expect(res).toEqual({ success: false });
    });
  });
});
