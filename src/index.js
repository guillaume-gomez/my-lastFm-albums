import dotenv from 'dotenv'

import React from 'react';
import ReactDOM from 'react-dom';

import { createBrowserHistory } from "history";
import { HashRouter, Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';

import "./reset.css";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const hist = createBrowserHistory();
// set up dotenv
dotenv.config()


document.addEventListener("DOMContentLoaded", e => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter history={hist}>
        <Switch>
          <Route path={"/"} component={App}/>;
        </Switch>
      </HashRouter>
    </Provider>
    , document.getElementById('root'));

});
registerServiceWorker();
