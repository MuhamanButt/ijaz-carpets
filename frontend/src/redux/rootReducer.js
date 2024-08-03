import { combineReducers } from "redux";
import cartReducer from "./Cart.js/Reducer";
import adminReducer from "./AdminToken/Reducer";

const rootReducer = combineReducers({
  adminToken :adminReducer,
  cart:cartReducer
});

export default rootReducer;
