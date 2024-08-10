import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from './redux/store';
import { ConfigProvider } from 'antd';
import { BUTTON, CAROUSEL, FLOAT_BUTTON, MENU, PAGINATION, RADIO, SELECT, SLIDER, UPLOAD } from './utils/Colors';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider
  theme={{
    components: {
      Slider: SLIDER,
      Button:BUTTON,
      Carousel: CAROUSEL,
      Upload:UPLOAD,
      Menu :MENU,
      Radio:RADIO,
      Pagination:PAGINATION,
      Select:SELECT,
      FloatButton:FLOAT_BUTTON
    },
  }}
>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

