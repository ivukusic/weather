import { UserType } from '../../types';
import { TYPE_LOGOUT, TYPE_SET_AUTHENTICATION } from '../constants/Store.constants';

export const AUTH_INITIAL_STATE = {
  user: null,
  isLoggedIn: false,
};

interface LogoutAction {
  type: typeof TYPE_LOGOUT;
}

interface LoginAction {
  type: typeof TYPE_SET_AUTHENTICATION;
  payload: UserType;
}

export type AuthActionTypes = LoginAction | LogoutAction;

export interface AuthReducerType {
  isLoggedIn: boolean;
  user: UserType | null;
}

export default (state = AUTH_INITIAL_STATE, action: AuthActionTypes): AuthReducerType => {
  if (action.type === TYPE_SET_AUTHENTICATION) {
    return { ...state, user: action.payload, isLoggedIn: true };
  }
  if (action.type === TYPE_LOGOUT) {
    return { ...AUTH_INITIAL_STATE };
  }
  return state;
};
