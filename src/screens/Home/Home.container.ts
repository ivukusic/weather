import { connect } from 'react-redux';

import { RootState } from 'core/MainReducer';
import { getWeatherData } from 'library/common/actions/Weather.actions';
import Home from './Home.component';

const mapStateToProps = ({ weatherReducer }: RootState) => ({
  weather: weatherReducer.weather,
});

export default connect(mapStateToProps, { getWeatherData })(Home);