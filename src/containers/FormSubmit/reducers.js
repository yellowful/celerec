import {
  initialFormState,
  SUBMIT,
  LOAD_USER,
} from './constants'

import { 
  SIGN_OUT,
  RIGISTER,
} from './../../constants'

export const formReducer = (state = initialFormState, action = {}) => {
  switch (action.type) {
    case SUBMIT:
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
    default:
      return state;
  }
}