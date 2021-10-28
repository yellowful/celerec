// 要給下面initialLcaleState用的
import English from './lang/en.json';
// const backendURL = 'http://web-app-developement.bdr.rocks:3005';//for developement only
// deploy用的後端網址，要給App.js和actions.js用的
export const backendURL = 'https://quiet-retreat-05063.herokuapp.com';
//以下都是要給actions.js用的常數，將string設成變數比較不會出現typo
export const LANGUAGE_DETECTION = '[Locale] LANGUAGE_DETECTION';
export const SET_LANGUAGE = '[Locale] SET_LANGUAGE';
export const RIGISTER = '[Form] RIGISTER';
export const ENTER_LISTENER = '[Link] ENTER_LISTENER';
export const TYPING = '[Link] TYPING';
export const SENDING = '[Link] [Result] [Message] SENDING';
export const CHECK_TYPE_OF_LINK = '[Link] CHECK_TYPE_OF_LINK';
export const CAPTURE_PAGE_PENDING = '[Message] CAPTURE_PAGE_PENDING';
export const CAPTURE_PAGE_SUCCESS = '[Link] CAPTURE_PAGE_SUCCESS';
export const CAPTURE_PAGE_FAILED = '[Message] CAPTURE_PAGE_FAILED';
export const GET_FACE_DATA_PENDING = '[Result] [Message] GET_FACE_DATA_PENDING';
export const GET_FACE_DATA_SUCCESS = '[Result] [Message] GET_FACE_DATA_SUCCESS';
export const GET_FACE_DATA_FAILED = '[Result] [Message] GET_FACE_DATA_FAILED';
export const FACE_BOX_CALCULATE = '[Link] FACE_BOX_CALCULATE';
export const UPLOAD_UPLOADING = '[Link] [Result] [Message] UPLOAD_UPLOADING';
export const UPLOAD_UPLOADED = '[Result] UPLOAD_UPLOADED';
export const SEND_IT_TO_BACKEND_PENDING = '[Message] SEND_IT_TO_BACKEND_PENDING';
export const SEND_IT_TO_BACKEND_SUCCESS = '[Link] SEND_IT_TO_BACKEND_SUCCESS';
export const SEND_IT_TO_BACKEND_FAILED = '[Result] [Message] SEND_IT_TO_BACKEND_FAILED';
export const SIGN_OUT = '[Locale] [Link] [Result] [Form] [Message] SIGN_OUT';
export const ENTRY_INCREMENT_PENDING = '[Form] ENTRY_INCREMENT_PENDING';
export const ENTRY_INCREMENT_SUCCESS = '[Form] ENTRY_INCREMENT_SUCCESS';
export const ENTRY_INCREMENT_FAILED = '[Form] ENTRY_INCREMENT_FAILED';
// 以下都是要給actions.js和reducers.js用的常數，主要是為reducers的初始值設計的
// 不同reducers要有不同的初始值，才能避免相同的state出現在不同的reducers裡
export const initialLcaleState = {
  // 預設英文
  locale: 'en-US',
  language: Object.assign({}, English)
}

export const initialLinkState = {
  // 取得輸入的字母
  searchField: '',
  // 記錄後端相片檔名
  backendFileName: '',
  // 記錄app的狀態
  linkStatus: ''
}

export const initialUserDataState = {
  // 記錄現在是否已經登入
  isSignIn: false,
  // 記錄app的狀態
  userDataStatus: '',
}

export const initialResultState = {
  // 預測的姓名
  predictName: [],
  // 臉部大小的框框
  faceBox: [],
  // 可能性
  probability: [],
  // 顯示在app的圖片網址
  appImageURL: '',
}

export const initialMessageState = {
  // 記錄提示訊息
  messageType: 'prompt',
}