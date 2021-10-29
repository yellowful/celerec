import {
  SIGN_IN,
  LOAD_USER,
  INPUT_MESSAGE,
  FORM_REQUEST_ERROR,
  FORM_CHANGE,
} from './constants';
import { backendURL } from '../App/constants';

// 註冊和登入時的送出鍵
// 點下時，登入狀態會設成true，註冊頁面狀態會設成false
const requestSignIn = (event) => {
  return {
    type: SIGN_IN,
    payload: { isSignIn: true, isRegister: false }
  }
}

// database更新資料之後，抓回來更新web app上目前使用者的state。
// Object.assign用來pass by value
export const requestLoadUser = (fetchUser) => ({
  type: LOAD_USER,
  payload: { currentUsers: Object.assign({}, fetchUser) }
})

// 所有input的欄位都用這個handler
// 不同的input設有不同的name對應state的key
// 所有input的event.target.value可以放進對應的value中
export const requestFormChange = (event) => {
  const target = event.target;
  const name = target?.name;
  const value = target.value;
  return {
    type:FORM_CHANGE,
    payload:{[name]: value} 
  }
}

// 註冊或登入的時候把資料傳到後端
  // 收到的response如果有錯，就不會是一個object
  // 如果沒錯，後端就會把使用者資料回傳
  // 如果資料格式正確，就把user載入
  // 有誤就報錯
export const requestFormSubmit = (event) => (dispatch,getState) => {
  // 避免refrash
  event.preventDefault();
  const { isRegister, name, password, email } = getState().formReducer;
  const data = {name,password,email}
  // 是register頁面的話就丟register的endpoint，是sigin頁面的話，就丟sigin的endpoint
  // 除此之外，有任何空白，就丟錯誤訊息
  if (isRegister && name && password && email) {
    dispatch(fetchForm('register', data))
  } else if (!isRegister && password && email) {
    dispatch(fetchForm('signin', data))
  } else {
    dispatch({
      type:INPUT_MESSAGE,
      payload:{loginError: true} 
    })
  }
}

// 丟endpoint和state進去，就把資料送去後端
const fetchForm = (endPoint, data) => (dispatch) => {
  // 用post的方式丟去後端
  fetch(`${backendURL}/${endPoint}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (typeof (res) === 'object') {
        // 設定為已登入
        dispatch(requestSignIn());
        // 載入使用者資料
        dispatch(requestLoadUser(res));
      } else {
        // 設定為登入錯誤的狀態
        dispatch({
          type: FORM_REQUEST_ERROR,
          payload: {loginError: true} 
        })
      }
    })
    .catch(err => {
      dispatch({
        type: FORM_REQUEST_ERROR,
        payload: {loginError: true} 
      })
    })
}

// 進入app前把輸入錯誤的訊息清掉
export const requestClear = () => ({
  type:FORM_REQUEST_ERROR,
  payload: {loginError: false} 
})