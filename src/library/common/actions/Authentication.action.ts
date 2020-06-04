import { Dispatch } from 'redux';

import { getStorageItem, removeStorageItem, setStorageItem } from 'library/utilities';
import identifierConstants from '../constants/Identifier.constants';
import { TYPE_LOGOUT, TYPE_SET_AUTHENTICATION } from '../constants/Store.constants';
import { AuthActionTypes } from '../reducers/Authentication.reducer';

export const checkLogin = () => (dispatch: Dispatch): boolean => {
  const user = getStorageItem(identifierConstants.user);
  if (user) {
    dispatch({
      type: TYPE_SET_AUTHENTICATION,
      payload: { firstName: 'John', lastName: 'Wick' },
    });
    return true;
  }
  return false;
};

export const logoutUser = (): AuthActionTypes => {
  removeStorageItem(identifierConstants.user);
  return {
    type: TYPE_LOGOUT,
  };
};

export const loginUser = (): AuthActionTypes => {
  const user = { firstName: 'John', lastName: 'Wick' };
  setStorageItem(identifierConstants.user, user);
  return {
    type: TYPE_SET_AUTHENTICATION,
    payload: { firstName: 'John', lastName: 'Wick' },
  };
};
