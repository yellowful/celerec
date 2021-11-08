import React from 'react';
import { render as rtlRender } from '@testing-library/react'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import {
  localeReducer,
  linkReducer,
  userDataReducer,
  resultReducer,
  messageReducer
} from './containers/App/reducers';
import { formReducer } from './containers/FormSubmit/reducers';
// 合併reducer
const rootReducers = combineReducers({
  localeReducer,
  linkReducer,
  userDataReducer,
  resultReducer,
  messageReducer,
  formReducer,
})

//createStore和applyMiddleware是redux的API，composeEnhancers是給chrome extension用的
//createStore會把rootReducers傳過來的state放到Provider的store儲存起來
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));
// 要給teting library的render用的
const ReduxWraper = ({children}) => (
  <Provider store={store} >
    {children}
  </Provider>
)
// 包起來要給testing library用
export const reduxRender = (component,options) => rtlRender(
    component,{wrapper:ReduxWraper,...options}
)
// 要測試intl相關功能可以用，目前用不到
// export const intlRender = (component,locale,language) => rtlRender(
//     <IntlProvider locale={locale} messages={language}>
//         {component}
//     </IntlProvider>
// )

// re-export everything
export * from '@testing-library/react'
