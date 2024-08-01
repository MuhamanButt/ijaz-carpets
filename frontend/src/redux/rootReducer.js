import { combineReducers } from "redux";
import authReducer from "./AuthToken/Reducer";
import cartReducer from "./Cart.js/Reducer";

const rootReducer = combineReducers({
  authToken :authReducer,
  cart:cartReducer
});

export default rootReducer;
