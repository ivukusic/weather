import { connect } from 'react-redux';

import { RootState } from 'core/MainReducer';
import { getWeatherDataByCity } from 'library/common/actions/Weather.actions';
import City from './City.component';

const mapStateToProps = ({ weatherReducer }: RootState) => ({
  weather: weatherReducer.weather,
});

export default connect(mapStateToProps, { getWeatherDataByCity })(City);
