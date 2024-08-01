import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

import rootReducer from "./rootReducer";  // Ensure you reference the correct root reducer

const persistConfig = {
  key: "webVideoPersistStore",
  storage,
  blacklist: ['cookieConsent'],  // Add other reducers to blacklist if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export default store;
export { persistor };
