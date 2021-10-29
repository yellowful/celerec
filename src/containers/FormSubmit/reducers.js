import {
  initialFormState,
  SIGN_IN,
  LOAD_USER,
  FORM_REQUEST_ERROR,
  FORM_CHANGE,
} from './constants'

import { 
  SIGN_OUT,
  RIGISTER,
} from '../App/constants'

// 處理和form相關的state
export const formReducer = (state = initialFormState, action = {}) => {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {isRegister:action.payload.isRegister})
    case LOAD_USER:
      return Object.assign({}, state, action.payload)
    case SIGN_OUT:
      return Object.assign({}, state, {
        isRegister: action.payload.isRegister,
        currentUsers: action.payload.currentUsers,
      })
    case RIGISTER:
      return Object.assign({}, state, {isRegister:action.payload.isRegister})
    case FORM_REQUEST_ERROR:
      return Object.assign({}, state, action.payload)
    case FORM_CHANGE:
      return Object.assign({}, state, action.payload)
    default:
      return state;
  }
}