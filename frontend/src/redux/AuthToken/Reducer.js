// src/redux/reducer.js

import { SET_AUTH_TOKEN, REMOVE_AUTH_TOKEN, SET_LOGGED_IN } from './Types';

const initialState = {
  token: null,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case REMOVE_AUTH_TOKEN:
      return {
        ...state,
        token: null,
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload  // Clear token if not logged in
      };
    default:
      return state;
  }
};

export default authReducer;
