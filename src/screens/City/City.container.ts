import { connect } from 'react-redux';

import { RootState } from 'core/MainReducer';
import {
  addRemoveToFavorites,
  deleteNote,
  getWeatherDataByCity,
  saveNotes,
} from 'library/common/actions/Weather.actions';
import City from './City.component';

const mapStateToProps = ({ weatherReducer }: RootState) => ({
  ...weatherReducer,
});

export default connect(mapStateToProps, { addRemoveToFavorites, deleteNote, getWeatherDataByCity, saveNotes })(City);
