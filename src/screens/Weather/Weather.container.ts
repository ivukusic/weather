import { connect } from 'react-redux';

import { RootState } from 'core/MainReducer';
import { getWeatherData } from './Weather.action';
import Weather from './Weather.component';

const mapStateToProps = ({ weatherReducer }: RootState) => ({
  weather: weatherReducer.weather,
});

export default connect(mapStateToProps, { getWeatherData })(Weather);
