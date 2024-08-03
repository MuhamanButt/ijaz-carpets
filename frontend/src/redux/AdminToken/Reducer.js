// src/redux/reducer.js

import {  SET_LOGGED_IN } from './Types';

const initialState = {
  token: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        isLoggedIn: action.payload  // Clear token if not logged in
      };
    default:
      return state;
  }
};

export default adminReducer;
