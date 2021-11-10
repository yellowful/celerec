export const SIGN_IN = '[Form] SIGN_IN';
export const LOAD_USER = '[Form] LOAD_USER';
export const FORM_REQUEST_ERROR = '[Form] FORM_REQUEST_ERROR';
export const FORM_CHANGE = '[Form] FORM_CHANGE';

export const initialFormState = {
    // 記錄是否要去登錄的頁面
    isRegister: false,
    // 記錄目前使用者資料
    currentUsers: {},
    // input的資料
    name: '',
    password: '',
    email: '',
    // 輸入錯誤的狀態
    loginError: false,
};