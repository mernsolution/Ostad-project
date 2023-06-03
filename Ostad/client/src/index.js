
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./assets/css/bootstrap.css"
import "./assets/css/animate.min.css"
import "./assets/css/style.css"


import {Provider} from 'react-redux';
import store from '../src/Redux/Store/store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


