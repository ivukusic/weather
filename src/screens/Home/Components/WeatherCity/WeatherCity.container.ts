import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RootState } from 'core/MainReducer';
import {
  addRemoveToFavorites,
  getWeatherDataByCity,
  removeFromList,
  resetList,
} from 'library/common/actions/Weather.actions';
import WeatherCity from './WeatherCity.component';

const mapStateToProps = ({ weatherReducer }: RootState) => ({
  ...weatherReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    addRemoveToFavorites,
    getWeatherDataByCity,
    removeFromList,
    resetList,
  })(WeatherCity),
);
