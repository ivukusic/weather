import { combineReducers } from 'redux';

import weatherReducer, { WeatherReducerType } from 'library/common/reducers/Weather.reducer';

const rootReducer = combineReducers({
  weatherReducer,
});

export type RootState = {
  weatherReducer: WeatherReducerType;
};

export default rootReducer;
