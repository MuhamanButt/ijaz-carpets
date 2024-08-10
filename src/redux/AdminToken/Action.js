// src/redux/actions.js

import { SET_LOGGED_IN } from './Types';

export const setLoggedIn = (isLoggedIn) => ({
  type: SET_LOGGED_IN,
  payload: isLoggedIn,
});
