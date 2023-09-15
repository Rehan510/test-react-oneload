import React from 'react';
import store from './config/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import 'antd/dist/reset.css';
import 'antd/dist/antd.min.js';
import 'antd/dist/antd.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/telemart/css/styles.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cache from './utils/Cache';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Cache />
        <Routes />
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
