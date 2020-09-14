import { connect } from 'react-redux';

import { RootState } from 'core/MainReducer';
import {
  addRemoveToFavorites,
  getWeatherData,
  removeFromList,
  resetList,
} from 'library/common/actions/Weather.actions';
import Home from './Home.component';

const mapStateToProps = ({ weatherReducer }: RootState) => ({
  ...weatherReducer,
});

export default connect(mapStateToProps, { addRemoveToFavorites, getWeatherData, removeFromList, resetList })(Home);
