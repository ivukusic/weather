import { combineReducers } from 'redux';

import authReducer, { AuthReducerType } from 'library/common/reducers/Authentication.reducer';
import weatherReducer, { WeatherReducerType } from 'screens/Weather/Weather.reducer';

const rootReducer = combineReducers({
  authReducer,
  weatherReducer,
});

export type RootState = {
  authReducer: AuthReducerType;
  weatherReducer: WeatherReducerType;
};

export default rootReducer;
