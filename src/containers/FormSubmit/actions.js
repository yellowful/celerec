import {
  SUBMIT,
  LOAD_USER,
} from './constants'


// 註冊和登入時的送出鍵
// 點下時，登入狀態會設成true，註冊頁面狀態會設成false
export const requestSubmit = (event) => {
  return {
    type: SUBMIT,
    payload: { isSignIn: true, isRegister: false }
  }
}

// database更新資料之後，抓回來更新web app上目前使用者的state。
// Object.assign用來pass by value
export const requestLoadUser = (fetchUser) => ({
  type: LOAD_USER,
  payload: { currentUsers: Object.assign({}, fetchUser) }
})

