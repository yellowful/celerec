import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux'
import './index.css';
import App from './containers/App';
import { rootReducers } from './reducers'
import * as serviceWorker from './serviceWorker';

//這是要給chrome的redux devtools extension用的。
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//createStore和applyMiddleware是redux的API，composeEnhancers是給chrome extension用的
//createStore會把rootReducers傳過來的state放到Provider的store儲存起來
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
//Provider會讓App裡面的prop有新的state
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
