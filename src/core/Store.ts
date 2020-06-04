import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { enableBatching } from 'redux-batched-actions';
import appReducer from './MainReducer';

export const store = createStore(appReducer, applyMiddleware(thunk));

export default store;
