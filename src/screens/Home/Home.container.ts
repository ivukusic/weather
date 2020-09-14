import { connect } from 'react-redux';

import { RootState } from 'core/MainReducer';
import {
  addRemoveToFavorites,
  getWeatherData,
  getWeatherDataByCity,
  removeFromList,
  resetList,
} from 'library/common/actions/Weather.actions';
import Home from './Home.component';

const mapStateToProps = ({ weatherReducer }: RootState) => ({
  ...weatherReducer,
});

export default connect(mapStateToProps, {
  addRemoveToFavorites,
  getWeatherData,
  getWeatherDataByCity,
  removeFromList,
  resetList,
})(Home);
