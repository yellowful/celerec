import {
    backendURL,
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
import English from './lang/en.json';
import Mandarin from './lang/zh.json';
import Spanish from './lang/es.json';


export const requestLanguageDetection = () => {
    if (navigator.language.includes('zh')) {
        return {
            type: LANGUAGE_DETECTION,
            payload: {
                locale: 'zh-TW',
                language: Object.assign({}, Mandarin)
            }
        }
    } else if (navigator.language.includes('es')) {
        return {
            type: LANGUAGE_DETECTION,
            payload: {
                locale: 'es-ES',
                language: Object.assign({}, Spanish)
            }
        }
    } else {
        return {
            type: LANGUAGE_DETECTION,
            payload: {
                locale: 'en-US',
                language: Object.assign({}, English)
            }
        }
    }
}

export const requestSetLanguage = (text) => {
    switch (text) {
        case 'zh':
            return {
                type: SET_LANGUAGE,
                payload: {
                    locale: 'zh-TW',
                    language: Object.assign({}, Mandarin)
                }
            }
        case 'es':
            return {
                type: SET_LANGUAGE,
                payload: {
                    locale: 'es-ES',
                    language: Object.assign({}, Spanish)
                }
            }
        default:
            return {
                type: SET_LANGUAGE,
                payload: {
                    locale: 'en-US',
                    language: Object.assign({}, English)
                }
            }
    }
}

export const requestEnterListener = (event) => (dispatch) => {
    dispatch ({type: ENTER_LISTENER});
    if (event.key === 'Enter') {
        dispatch(requestSending());
    }
}//監聽search bar是否已經按下enter，用來取代send按鈕

export const requestTyping = (event) => {
    return {
        type: TYPING,
        payload: { searchField: event.target.value }
    };
}//抓取搜尋欄的完整字串

export const requestSending = () => (dispatch, getState) => {
    const { searchField } = getState();
    if (searchField) {
        dispatch({
            type: SENDING,
            payload: {
                predictName: [],
                faceBox: [],
                probability: [],
                backendFileName: '',
                searchField: '',
                appImageURL: '',
                messageType: 'loading'
            }
        });
        //把前一次查詢的框框刪掉
        //如果前一次是upload，把backendFileName清空，空字串可以讓後端知道是input url，不用刪暫存的image
        //把輸入欄清空，以利下次輸入
        //更新完整網址
        //清空錯誤訊息，以便如果沒有錯誤時，正確答案能在ImageRecoginzed被正確顯示
        dispatch(requestCheckTypeOfLink(searchField));
        //把完整網址送出抓取預測的資料
        dispatch(requestEntryIncrement());
        //entries加一
    } else {
        dispatch({
            type: SENDING,
            payload: {
                predictName: [],
                faceBox: [],
                probability: [],
                appImageURL: '',
                messageType: 'inputError'
            }
        });
        console.log('submit error')
        //輸入空白的話顯示錯誤訊息
    }
}//監聽送出鍵是否被點，被點的話就去抓資料

export const requestCheckTypeOfLink = (linkUnchecked) => (dispatch) => {
    dispatch({
        type: CHECK_TYPE_OF_LINK,
        payload: linkUnchecked
    })
    const typesAccepted = ['.jpeg', '.jpg', '.png', '.tiff', '.tif', '.bmp', '.webp'];
    const isImage = new RegExp(typesAccepted.join("|")).test(linkUnchecked);
    if (isImage) {
        dispatch(requestGetFaceData(linkUnchecked))
    } else {
        dispatch(requestCapturePage(linkUnchecked))
    }
}

export const requestCapturePage = (noneImageLink) => (dispatch) => {
    dispatch({
        type: CAPTURE_PAGE_PENDING,
        payload: {
            messageType: 'capturing'
        }
    })
    fetch(`${backendURL}/capture`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            'captureUrl': noneImageLink
        })
    })
        .then(data => data.json())
        .then(response => {
            dispatch({
                type: CAPTURE_PAGE_SUCCESS,
                payload: {
                    backendFileName: response
                }
            })
            const clarifaiImageURL = `${backendURL}/${response}`
            dispatch(requestGetFaceData(clarifaiImageURL));
        })
        .catch(err => {
            dispatch({
                type: CAPTURE_PAGE_FAILED,
                payload: {
                    messageType: 'captureError'
                }
            })
        })
}

export const requestGetFaceData = (clarifaiImageURL) => (dispatch, getState) => {
    const { backendFileName } = getState();
    dispatch({
        type: GET_FACE_DATA_PENDING,
        payload: {
            appImageURL: clarifaiImageURL,
            messageType: 'recognizing'
        }
    })
    fetch(`${backendURL}/imageurl`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            'clarifaiImageURL': clarifaiImageURL,
            'backendFileName': backendFileName
        })
    })
        //向後端傳送要辨識端圖片的網址
        .then(data => data.json())
        //JSON格式轉換
        .then(response => {
            const numberOfCelebrities = response.rawData.outputs[0].data.regions.length;
            //回傳的資料正常的話，抽出名字、方框資料、可能性
            if (numberOfCelebrities) {
                let name = [];
                let boxData = [];
                let probability = [];
                for (let i = 0; i < numberOfCelebrities; i++) {
                    name.push(response.rawData.outputs[0].data.regions[i].data.concepts[0].name);
                    //回來的資料直接就是物件了，不用再parse了
                    //取出預測的姓名（留預測度最高的一個而已）
                    boxData.push(dispatch(requestFaceBoxCalculate(response.rawData.outputs[0].data.regions[i].region_info.bounding_box)));
                    //取回預測人臉位置的方框資料，是4個0-1之間的比例數字，所以不管圖片大小如何，比例都一樣
                    probability.push(
                        Math.round(response.rawData.outputs[0].data.regions[i].data.concepts[0].value * 10000) / 100
                    );
                    //取回預測機率，百分比取到小數點後兩位
                }
                dispatch({
                    type: GET_FACE_DATA_SUCCESS,
                    payload: {
                        faceBox: boxData.concat(),
                        predictName: name.concat(),
                        probability: probability.concat(),
                        messageType: 'showResult'
                    }
                })
                //更新人臉方框數值、預測的姓名、秀機率
            } else {
                //假設回傳的資料有誤，最可能是傳的相片不是人臉，把這幾個資料重設初始值，然後顯示錯誤
                dispatch({
                    type: GET_FACE_DATA_FAILED,
                    payload: {
                        predictName: [],
                        faceBox: [],
                        probability: [],
                        appImageURL: '',
                        messageType: 'noFace'
                    }
                })
                console.log('no face')
                //如果後端沒有回傳辨識結果，可能發生上傳的圖檔不是人臉，在console顯示錯誤訊息。
            }
        })
        .catch(err => {
            dispatch({
                type: GET_FACE_DATA_FAILED,
                payload: {
                    predictName: [],
                    faceBox: [],
                    probability: [],
                    appImageURL: '',
                    messageType: 'fetchError'
                }
            })
            console.log('fetch error')
        });//如果後端沒有response，顯示傳輸錯誤。
}
//把完整網址送出抓取預測的資料

export const requestFaceBoxCalculate = (boxData) => (dispatch) => {

    dispatch({ type: FACE_BOX_CALCULATE })

    const imageBox = document.querySelector('#celebrity-pic');
    //抓DOM的node，找到圖片以利抓出圖片畫素
    //用.getElementById()同樣可行
    let { top_row, left_col, bottom_row, right_col } = boxData;
    //destucture，將方框物件轉成變數，以利計算
    boxData.top_row = imageBox.offsetHeight * top_row;
    //算出頂邊的像素
    //這裏要注意的是，在React中，取得圖片的height竟然不是.height，而是.offsetHeight
    boxData.left_col = imageBox.offsetWidth * left_col;
    //算出左邊框距離相片左邊框幾像素
    boxData.bottom_row = imageBox.offsetHeight * (1 - bottom_row);
    //API給的是從原相片頂端到框框底端的距離是原相片的幾倍(0-1的數值)，而css需要的是框框底部到原相片底部的像素
    boxData.right_col = imageBox.offsetWidth * (1 - right_col);
    //API給的是從原相片左邊到框框右邊的距離是原相片的幾倍(0-1的數值)，而css需要的是框框右邊到原相片右邊的像素
    return boxData;
    //把像素的物件取代原來的比例數值的物件，回傳回去
}//將人臉方框的比例，換算成像素，供方框四個邊位移用


export const requestSubmit = (event) => {
    return {
        type: SUBMIT,
        payload: { isSignIn: true, isRegister: false }
    }
}
//註冊和登入時的送出鍵
//點下時，登入狀態會設成true，註冊頁面狀態會設成false

export const requestUpload = (event) => (dispatch) => {
    event.preventDefault();
    //取消html點了upload file後預設行為，例如離開網頁了，
    //改作我們定義的onUpload做的事情。
    //檔案內容，是一個blob物件  
    const imageFile = event.target.files;
    if (imageFile.length) {
        dispatch({
            type: UPLOAD_UPLOADING,
            payload: {
                faceBox: [],
                backendFileName: '',
                searchField: '',
                appImageURL: '',
                messageType: 'uploading'
            }
        });
        //先把前一次搜尋清空

        const fileReader = new FileReader();
        //用來處理讀取檔案用，我們需要他裡面的method
        //可以把binery的檔案進行編碼成文字或是圖檔等
        fileReader.readAsDataURL(imageFile[0]);
        //把blob物件所在記憶體，轉成url的形式
        fileReader.onloadend = () => {
            dispatch({
                type: UPLOAD_UPLOADED,
                payload: {
                    faceBox: [],
                    appImageURL: fileReader.result
                }
            })
        }//在檔案載入後，把url放進appImageURL
        dispatch(requestSendItToBackend(imageFile));
        //把檔案丟出後端
        event.target.value = '';
    }
}

export const requestSendItToBackend = (imageFile) => (dispatch) => {
    dispatch({
        type: SEND_IT_TO_BACKEND_PENDING,
        payload: { messageType: 'uploading' }
    })
    const formData = new FormData();
    //用來把image檔案包成form檔檔案格式，以利檔案傳輸
    formData.append('uploadfile', imageFile[0]);
    //imageFile[0]是檔案，uploadfile是要fetch給後端的檔案名稱，不是原始檔案名稱
    //封裝成form格式
    //這樣格式的好處是，可以async的傳送binery的檔案，一般格式好像只能傳json資料    
    fetch(`${backendURL}/upload`, {
        method: 'POST',
        body: formData
    })
        //把檔案傳給後端
        .then(res => res.json())
        .then((backendFileName) => {
            const clarifaiImageURL = backendURL + '/' + backendFileName;
            dispatch({
                type: SEND_IT_TO_BACKEND_SUCCESS,
                payload: { backendFileName: backendFileName }
            })
            //把前一次查詢的框框刪掉
            dispatch(requestGetFaceData(clarifaiImageURL));
            //把完整網址送出抓取預測的資料
            dispatch(requestEntryIncrement());
        })
        .catch(err => {
            dispatch({
                type: SEND_IT_TO_BACKEND_FAILED,
                payload: {
                    predictName: [],
                    faceBox: [],
                    probability: [],
                    appImageURL: '',
                    messageType: 'fetchError'
                }
            })
            console.log('upload err')
        })//如果送圖給後端出錯的話，重設初始值，然後顯示錯誤。
}

export const requestSignOut = (event) => ({
    type: SIGN_OUT,
    payload: initialState
})
//登出了，就把登入狀態設成false
//把其他state設成初始的狀態
//如果是在register的頁面點signin，也需要跑到signin那個component

export const requestRegister = (event) => ({
    type: RIGISTER,
    payload: { isRegister: true }
})
//如果是要去登入頁面，就把註冊頁面狀態設成true

export const requestEntryIncrement = () => (dispatch,getState) => {
    dispatch({ type: ENTRY_INCREMENT_PENDING })
    fetch(`${backendURL}/image`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getState().currentUsers)
        }
    )
        .then(res => res.json())
        .then(refreshUser => {
            dispatch({ type: ENTRY_INCREMENT_SUCCESS })
            dispatch(requestLoadUser(refreshUser[0]));
        })
        .catch(err => {
            console.log('back-end error')
            dispatch({ type:ENTRY_INCREMENT_FAILED})
        })
}
//使用者點下送出人臉辨識之後，這個function會叫後端去把資料庫的使用次數加1
//然後把加1後的使用者資料回傳回來
//回傳後，再把web app的使用者資料更新

export const requestLoadUser = (fetchUser) => ({
    type: LOAD_USER,
    payload: { currentUsers: Object.assign({}, fetchUser) }
})
//database更新資料之後，抓回來更新web app上目前使用者的state。
//Object.assign用來pass by value