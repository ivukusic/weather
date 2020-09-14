import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import appReducer from './MainReducer';

const persistConfig = {
  key: 'root',
  // blacklist: ['weatherReducer'],
  whitelist: ['weatherReducer'],
  storage,
};

const persistedReducer: any = persistReducer(persistConfig, appReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
