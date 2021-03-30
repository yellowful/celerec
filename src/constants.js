//const backendURL = 'http://web-app-developement.bdr.rocks:3005';//for developement only
export const backendURL = 'https://quiet-retreat-05063.herokuapp.com';
export const LANGUAGE_DETECTION = 'LANGUAGE_DETECTION';
export const initialState = {
    searchField: '',
    //取得輸入的字母
    backendFileName: '',
    appImageURL: '',
    //web app的圖片網址
    //clarifaiImageURL:'',
    //要送給clarifai的網址
    predictName: [],
    //抓回來的資料中，預測的姓名
    isSignIn: false,
    //記錄現在是否已經登入
    isRegister: false,
    //記錄是否要去登錄的頁面
    faceBox: [],
    //記錄面部框框的資料
    probability: [],
    currentUsers: {},
    messageType: 'prompt',
    status:'',
}
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const ENTER_LISTENER = 'ENTER_LISTENER';
export const TYPING = 'TYPING';
export const SENDING = 'SENDING';
export const CHECK_TYPE_OF_LINK = 'CHECK_TYPE_OF_LINK';
export const CAPTURE_PAGE_PENDING = 'CAPTURE_PAGE_PENDING';
export const CAPTURE_PAGE_SUCCESS = 'CAPTURE_PAGE_SUCCESS';
export const CAPTURE_PAGE_FAILED = 'CAPTURE_PAGE_FAILED';
export const GET_FACE_DATA_PENDING = 'GET_FACE_DATA_PENDING';
export const GET_FACE_DATA_SUCCESS = 'GET_FACE_DATA_SUCCESS';
export const GET_FACE_DATA_FAILED = 'GET_FACE_DATA_FAILED';
export const FACE_BOX_CALCULATE = 'FACE_BOX_CALCULATE';
export const SUBMIT = 'SUBMIT';
export const UPLOAD_UPLOADING = 'UPLOAD_UPLOADING';
export const UPLOAD_UPLOADED = 'UPLOAD_UPLOADED';
export const SEND_IT_TO_BACKEND_PENDING = 'SEND_IT_TO_BACKEND_PENDING';
export const SEND_IT_TO_BACKEND_SUCCESS = 'SEND_IT_TO_BACKEND_SUCCESS';
export const SEND_IT_TO_BACKEND_FAILED = 'SEND_IT_TO_BACKEND_FAILED';
export const SIGN_OUT = 'SIGN_OUT';
export const RIGISTER = 'RIGISTER';
export const LOAD_USER = 'LOAD_USER';
export const ENTRY_INCREMENT_PENDING = 'ENTRY_INCREMENT_PENDING';
export const ENTRY_INCREMENT_SUCCESS = 'ENTRY_INCREMENT_SUCCESS';
export const ENTRY_INCREMENT_FAILED = 'ENTRY_INCREMENT_FAILED';
