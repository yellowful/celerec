import {
  initialLcaleState,
  initialLinkState,
  initialUserDataState,
  initialMessageState,
  initialResultState,
  LANGUAGE_DETECTION,
  SET_LANGUAGE,
  ENTER_LISTENER,
  TYPING,
  SENDING,
  CHECK_TYPE_OF_LINK,
  CAPTURE_PAGE_PENDING,
  CAPTURE_PAGE_SUCCESS,
  CAPTURE_PAGE_FAILED,
  GET_FACE_DATA_PENDING,
  GET_FACE_DATA_SUCCESS,
  GET_FACE_DATA_FAILED,
  FACE_BOX_CALCULATE,
  SUBMIT,
  UPLOAD_UPLOADING,
  UPLOAD_UPLOADED,
  SEND_IT_TO_BACKEND_PENDING,
  SEND_IT_TO_BACKEND_SUCCESS,
  SEND_IT_TO_BACKEND_FAILED,
  SIGN_OUT,
  RIGISTER,
  LOAD_USER,
  ENTRY_INCREMENT_PENDING,
  ENTRY_INCREMENT_SUCCESS,
  ENTRY_INCREMENT_FAILED
} from './constants'

// reducers是要丟給index.js用
// 會從redux API收到原來的 state 和新的 action，然後吐出新的 state 給 redux API 裡的store存起來

// 管理和locale有關的state
export const localeReducer = (state = initialLcaleState, action = {}) => {
  switch (action.type) {
    case LANGUAGE_DETECTION:
      return Object.assign({}, state, action.payload)
    case SET_LANGUAGE:
      return Object.assign({}, state, action.payload)
    default:
      return state;
  }
}

// 管理和link有關的state
export const linkReducer = (state = initialLinkState, action = {}) => {
  switch (action.type) {
    case ENTER_LISTENER:
      return Object.assign({}, state, { linkStatus: 'press Enter' })
    case TYPING:
      return Object.assign({}, state, action.payload)
    case SENDING:
      return Object.assign({}, state, {
        backendFileName: action.payload.backendFileName,
        searchField: action.payload.searchField,
      })
    case CHECK_TYPE_OF_LINK:
      return Object.assign({}, state, { linkStatus: `linkUnchecked:${action.payload}` })
    case CAPTURE_PAGE_SUCCESS:
      return Object.assign({}, state, action.payload)
    case FACE_BOX_CALCULATE:
      return Object.assign({}, state, { linkStatus: 'calculating' })
    case UPLOAD_UPLOADING:
      return Object.assign({}, state, {
        backendFileName: action.payload.backendFileName,
        searchField: action.payload.searchField,
      })
    case SEND_IT_TO_BACKEND_SUCCESS:
      return Object.assign({}, state, action.payload)
    case SIGN_OUT:
      return Object.assign({}, state, {
        searchField: action.payload.searchField,
        backendFileName: action.payload.backendFileName,
        linkStatus: action.payload.linkStatus,
      })
    default:
      return state;
  }
}

// 管理和sign in sign up有關的state
export const userDataReducer = (state = initialUserDataState, action = {}) => {
  switch (action.type) {
    case SUBMIT:
      return Object.assign({}, state, action.payload)
    case SIGN_OUT:
      return Object.assign({}, state, {
        isSignIn: action.payload.isSignIn,
        isRegister: action.payload.isRegister,
        currentUsers: action.payload.currentUsers,
        userDataStatus: action.payload.userDataStatus,
      })
    case RIGISTER:
      return Object.assign({}, state, action.payload)
    case ENTRY_INCREMENT_PENDING:
      return Object.assign({}, state, { userDataStatus: 'entry increment pending' })
    case ENTRY_INCREMENT_SUCCESS:
      return Object.assign({}, state, { userDataStatus: 'entry increment success' })
    case ENTRY_INCREMENT_FAILED:
      return Object.assign({}, state, { userDataStatus: 'entry increment success' })
    case LOAD_USER:
      return Object.assign({}, state, action.payload)
    default:
      return state;
  }
}
// 管理和辨識結果有關的state
export const resultReducer = (state = initialResultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SENDING:
      return Object.assign({}, state, {
        predictName: payload.predictName,
        faceBox: payload.faceBox,
        probability: payload.probability,
        appImageURL: payload.appImageURL,
      })
    case GET_FACE_DATA_PENDING:
      return Object.assign({}, state, { appImageURL: payload.appImageURL })
    case GET_FACE_DATA_SUCCESS:
      return Object.assign({}, state, {
        predictName: payload.predictName,
        faceBox: payload.faceBox,
        probability: payload.probability,
      })
    case GET_FACE_DATA_FAILED:
      return Object.assign({}, state, {
        predictName: payload.predictName,
        faceBox: payload.faceBox,
        probability: payload.probability,
        appImageURL: payload.appImageURL,
      })
    case UPLOAD_UPLOADING:
      return Object.assign({}, state, {
        predictName: payload.predictName,
        faceBox: payload.faceBox,
        probability: payload.probability,
        appImageURL: payload.appImageURL,
      })
    case UPLOAD_UPLOADED:
      return Object.assign({}, state, payload)
    case SEND_IT_TO_BACKEND_FAILED:
      return Object.assign({}, state, {
        predictName: payload.predictName,
        faceBox: payload.faceBox,
        probability: payload.probability,
        appImageURL: payload.appImageURL,
      })
    case SIGN_OUT:
      return Object.assign({}, state, {
        predictName: payload.predictName,
        faceBox: payload.faceBox,
        probability: payload.probability,
        appImageURL: payload.appImageURL,
      })
    default:
      return state;
  }
}
// 管理和訊息有關的state
export const messageReducer = (state = initialMessageState, action = {}) => {
  switch (action.type) {
    case SENDING:
      return Object.assign({}, state, { messageType: action.payload.messageType })
    case CAPTURE_PAGE_PENDING:
      return Object.assign({}, state, action.payload)
    case CAPTURE_PAGE_FAILED:
      return Object.assign({}, state, action.payload)
    case GET_FACE_DATA_PENDING:
      return Object.assign({}, state, { messageType: action.payload.messageType })
    case GET_FACE_DATA_SUCCESS:
      return Object.assign({}, state, { messageType: action.payload.messageType })
    case GET_FACE_DATA_FAILED:
      return Object.assign({}, state, { messageType: action.payload.messageType })
    case UPLOAD_UPLOADING:
      return Object.assign({}, state, { messageType: action.payload.messageType })
    case SEND_IT_TO_BACKEND_PENDING:
      return Object.assign({}, state, { messageType: action.payload.messageType })
    case SEND_IT_TO_BACKEND_FAILED:
      return Object.assign({}, state, { messageType: action.payload.messageType })
    case SIGN_OUT:
      return Object.assign({}, state, { messageType: action.payload.messageType })
    default:
      return state;
  }
}