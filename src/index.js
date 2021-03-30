import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux'
import './index.css';
import App from './containers/App';
import { rootReducers } from './reducers'
import * as serviceWorker from './serviceWorker';

const logger = createLogger();
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
  <Provider store={store} >
    <App className="main-gradient" />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
