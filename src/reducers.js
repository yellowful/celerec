import {
    initialState,
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
// 是丟給index.js用
// 會從redux API收到原來的 state 和新的 action，然後吐出新的 state 給 redux API 裡的store存起來
export const rootReducers = (state=initialState,action={}) => {
    switch(action.type){
        case LANGUAGE_DETECTION:
            return Object.assign({},state,action.payload)
        case SET_LANGUAGE:
            return Object.assign({},state,action.payload)
        case ENTER_LISTENER:
            return Object.assign({},state,{status:'press Enter'})
        case TYPING:
            return Object.assign({},state,action.payload)
        case SENDING:
            return Object.assign({},state,action.payload)
        case CHECK_TYPE_OF_LINK:
            return Object.assign({},state,{status:`linkUnchecked:${action.payload}`})
        case CAPTURE_PAGE_PENDING:
            return Object.assign({},state,action.payload)
        case CAPTURE_PAGE_SUCCESS:
            return Object.assign({},state,action.payload)
        case CAPTURE_PAGE_FAILED:
            return Object.assign({},state,action.payload)
        case GET_FACE_DATA_PENDING:
            return Object.assign({},state,action.payload)
        case GET_FACE_DATA_SUCCESS:
            return Object.assign({},state,action.payload)
        case GET_FACE_DATA_FAILED:
            return Object.assign({},state,action.payload)
        case FACE_BOX_CALCULATE:
            return Object.assign({},state,{status:'calculating'})
        case SUBMIT:
            return Object.assign({},state,action.payload)
        case UPLOAD_UPLOADING:
            return Object.assign({},state,action.payload)
        case UPLOAD_UPLOADED:
            return Object.assign({},state,action.payload)
        case SEND_IT_TO_BACKEND_PENDING:
            return Object.assign({},state,action.payload)
        case SEND_IT_TO_BACKEND_SUCCESS:
            return Object.assign({},state,action.payload)
            case SEND_IT_TO_BACKEND_FAILED:
            return Object.assign({},state,action.payload)
        case SIGN_OUT:
            return Object.assign({},state,action.payload)
        case RIGISTER:
            return Object.assign({},state,action.payload)
        case ENTRY_INCREMENT_PENDING:
            return Object.assign({},state,{status:'entry increment pending'})
        case ENTRY_INCREMENT_SUCCESS:
            return Object.assign({},state,{status:'entry increment success'})
        case ENTRY_INCREMENT_FAILED:
            return Object.assign({},state,{status:'entry increment success'})
        case LOAD_USER:
            return Object.assign({},state,action.payload)
        default:
            return state;
    }
}