import { connect } from 'react-redux';

import { RootState } from 'core/MainReducer';
import { addRemoveToFavorites, getWeatherDataByCity, saveNotes } from 'library/common/actions/Weather.actions';
import City from './City.component';

const mapStateToProps = ({ weatherReducer }: RootState) => ({
  ...weatherReducer,
});

export default connect(mapStateToProps, { addRemoveToFavorites, getWeatherDataByCity, saveNotes })(City);
