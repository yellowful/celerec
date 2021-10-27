import {
  backendURL,
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
  ENTRY_INCREMENT_FAILED,
} from './constants'

// 把各國翻譯載入
import English from './lang/en.json';
import Mandarin from './lang/zh.json';
import Spanish from './lang/es.json';

// 所有的actions都會丟進App.js裡，要給mapDispatchToProps來用

// 偵測瀏覽器的locale，然後把對應的locale和翻譯檔案載入payload當中，以利後續變成state來render。
// 之後會放在App的constructor裡面執行，因為是Component一載入就要先執行
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

// 設定locale的state，和截入對應的翻譯檔給state, 以利後續react-intl的api使用
// 主要是供Nav切換語言用
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

// 監聽search bar是否已經按下enter，用來取代send按鈕
export const requestEnterListener = (event) => (dispatch) => {
  dispatch({ type: ENTER_LISTENER });
  if (event.key === 'Enter') {
    dispatch(requestSending());
  }
}

// 抓取搜尋欄的完整字串
export const requestTyping = (event) => {
  return {
    type: TYPING,
    payload: { searchField: event.target.value }
  };
}

//監聽送出鍵是否被點，被點的話就去抓資料
export const requestSending = () => (dispatch, getState) => {
  // 抓取searchField這個state來用
  const { searchField } = getState().linkReducer;
  // 假設searchField裡面有東西，先丟一個SENDING的action出去，並把一些state還原到初始值
  // 把前一次查詢的框框刪掉
  // 如果前一次是upload，把backendFileName清空，空字串可以讓後端知道是input url，不用刪暫存的image
  // 把輸入欄清空，以利下次輸入
  // 更新完整網址
  // 清空錯誤訊息，以便如果沒有錯誤時，正確答案能在ImageRecoginzed被正確顯示
  if (searchField) {
    dispatch({
      type: SENDING,
      payload: {
        ...initialResultState,
        backendFileName: '',
        searchField: '',
        messageType: 'loading'
      }
    });
    //把完整網址送出確認是不是圖片網址，以及抓取預測的資料
    dispatch(requestCheckTypeOfLink(searchField));
    //entries加一
    dispatch(requestEntryIncrement());

    //如果輸入是空白的，就把訊息state更新為"inputError"
  } else {
    dispatch({
      type: SENDING,
      payload: {
        ...initialResultState,
        messageType: 'inputError'
      }
    });
    // 輸入空白的話顯示錯誤訊息
    console.log('submit error')
  }
}
// 檢查網址裡面是不是有圖片格式的字串，把網址送去後端轉送clarifai或截圖。
export const requestCheckTypeOfLink = (linkUnchecked) => (dispatch) => {
  // 丟出檢查中的action
  dispatch({
    type: CHECK_TYPE_OF_LINK,
    payload: linkUnchecked
  })
  // 接收的檔案格式
  const typesAccepted = ['.jpeg', '.jpg', '.png', '.tiff', '.tif', '.bmp', '.webp'];
  // 把array變成邏輯語法，丟進RegExp裡面，用以檢驗linkUnchecked網址是不是有這幾個字串之一。
  const isImage = new RegExp(typesAccepted.join("|")).test(linkUnchecked);
  // 假如網址含有圖片的字串，就向後端要求轉發給clarifai，反之就向後端要求截圖
  if (isImage) {
    // 向後端要求轉發給clarifai
    dispatch(requestGetFaceData(linkUnchecked))
  } else {
    // 向後端要求截圖
    dispatch(requestCapturePage(linkUnchecked))
  }
}
// 向後端要求截圖
export const requestCapturePage = (noneImageLink) => (dispatch) => {
  // 發request之前先丟出截圖中的訊息
  dispatch({
    type: CAPTURE_PAGE_PENDING,
    payload: {
      messageType: 'capturing'
    }
  })
  // 將網址向後端截圖的end point發出request
  fetch(`${backendURL}/capture`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      'captureUrl': noneImageLink
    })
  })
    // 將回來的訊息解開
    .then(data => data.json())
    // 回傳的預計會是一個檔名
    .then(response => {
      dispatch({
        type: CAPTURE_PAGE_SUCCESS,
        payload: {
          backendFileName: response
        }
      })
      // 檔名加上後端網址後，就會是一個圖片網址，可以要求後端向clarifai轉發
      const clarifaiImageURL = `${backendURL}/${response}`
      dispatch(requestGetFaceData(clarifaiImageURL));
    })
    // fetch錯誤的話，顯示錯誤訊息
    .catch(err => {
      dispatch({
        type: CAPTURE_PAGE_FAILED,
        payload: {
          messageType: 'captureError'
        }
      })
    })
}
//把完整網址送去後端，後端向clarifai抓資料後，會丟預測的資料回來
export const requestGetFaceData = (clarifaiImageURL) => (dispatch, getState) => {
  // 如果狀態裡面有後端的檔名，代表先前是傳圖檔給後端存檔，或是要求後端截圖
  // 後端檔名要跟著向後端的request送出，後端要判斷網址有沒有跟著檔名送過來
  // 有檔名的話，後端向clarifai要完資料後，要把檔案砍掉
  const { backendFileName } = getState().linkReducer;
  // 先丟出辨識中的訊息才fetch
  dispatch({
    type: GET_FACE_DATA_PENDING,
    payload: {
      appImageURL: clarifaiImageURL,
      messageType: 'recognizing'
    }
  })
  // 向後端傳送要辨識端圖片的網址
  fetch(`${backendURL}/imageurl`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      'clarifaiImageURL': clarifaiImageURL,
      'backendFileName': backendFileName
    })
  })
    // JSON格式轉換
    .then(data => data.json())
    .then(response => {
      // 回傳的資料正常的話，抽出名字、方框資料、可能性
      const numberOfCelebrities = response.rawData.outputs[0].data.regions.length;
      if (numberOfCelebrities) {
        let name = [];
        let boxData = [];
        let probability = [];
        // 資料分類整理成陣列，以利後續用map來render
        for (let i = 0; i < numberOfCelebrities; i++) {
          // 取出預測的姓名，並且整理成陣列
          name.push(response.rawData.outputs[0].data.regions[i].data.concepts[0].name);
          // 取回預測人臉位置的方框資料，是4個0-1之間的比例數字，所以不管圖片大小如何，比例都一樣，並且也整理成陣列
          boxData.push(dispatch(requestFaceBoxCalculate(response.rawData.outputs[0].data.regions[i].region_info.bounding_box)));
          //取回預測機率，百分比取到小數點後兩位，並且整理成陣列
          probability.push(
            Math.round(response.rawData.outputs[0].data.regions[i].data.concepts[0].value * 10000) / 100
          );
        }
        // 將人臉資料存入states裡
        dispatch({
          type: GET_FACE_DATA_SUCCESS,
          payload: {
            faceBox: boxData.concat(),
            predictName: name.concat(),
            probability: probability.concat(),
            messageType: 'showResult'
          }
        })
        // 更新人臉方框數值、預測的姓名、秀機率
      } else {
        // 假設回傳的資料有誤，最可能是傳的相片不是人臉，把這幾個資料重設初始值，然後顯示錯誤
        dispatch({
          type: GET_FACE_DATA_FAILED,
          payload: {
            ...initialResultState,
            messageType: 'noFace'
          }
        })
        // 如果後端沒有回傳辨識結果，可能發生上傳的圖檔不是人臉，在console顯示錯誤訊息。
        console.log('no face')
      }
    })
    // 如果後端沒有response，顯示傳輸錯誤。
    .catch(err => {
      dispatch({
        type: GET_FACE_DATA_FAILED,
        payload: {
          ...initialResultState,
          messageType: 'fetchError'
        }
      })
      console.log('fetch error')
    });
}
// 把傳進來的人臉方框的比例，換算成像素，供方框四個邊位移用
export const requestFaceBoxCalculate = (boxData) => (dispatch) => {
  // 先丟一個計算中的action出去
  dispatch({ type: FACE_BOX_CALCULATE })
  // 抓DOM的node，找到圖片以利抓出圖片畫素
  // 用.getElementById()同樣可行
  const imageBox = document.querySelector('#celebrity-pic');
  // destucture，將方框物件轉成變數，以利計算
  let { top_row, left_col, bottom_row, right_col } = boxData;
  // 算出頂邊的像素
  // 這裏要注意的是，在React中，取得圖片的height竟然不是.height，而是.offsetHeight
  boxData.top_row = imageBox.offsetHeight * top_row;
  // 算出左邊框距離相片左邊框幾像素
  boxData.left_col = imageBox.offsetWidth * left_col;
  // API給的是從原相片頂端到框框底端的距離是原相片的幾倍(0-1的數值)，而css需要的是框框底部到原相片底部的像素
  boxData.bottom_row = imageBox.offsetHeight * (1 - bottom_row);
  // API給的是從原相片左邊到框框右邊的距離是原相片的幾倍(0-1的數值)，而css需要的是框框右邊到原相片右邊的像素
  boxData.right_col = imageBox.offsetWidth * (1 - right_col);
  //把像素的物件取代原來的比例數值的物件，回傳回去
  return boxData;
}

// 註冊和登入時的送出鍵
// 點下時，登入狀態會設成true，註冊頁面狀態會設成false
export const requestSubmit = (event) => {
  return {
    type: SUBMIT,
    payload: { isSignIn: true, isRegister: false }
  }
}

// 使用者點上傳檔案後要做的事，要傳給SearchBar的檔案上傳鈕用的
export const requestUpload = (event) => (dispatch) => {
  // 取消html點了upload file後預設行為，例如離開網頁了，
  // 改作我們定義的onUpload做的事情。
  event.preventDefault();

  // 檔案內容，是一個blob物件  
  const imageFile = event.target.files;

  // 先把前一次搜尋清空
  if (imageFile.length) {
    dispatch({
      type: UPLOAD_UPLOADING,
      payload: {
        ...initialResultState,
        backendFileName: '',
        searchField: '',
        messageType: 'uploading'
      }
    });

    // 用來處理讀取檔案用，我們需要他裡面的method
    // 可以把binery的檔案進行編碼成文字或是圖檔等
    const fileReader = new FileReader();
    // 把blob物件所在記憶體，轉成url的形式
    fileReader.readAsDataURL(imageFile[0]);
    // 在檔案載入後，把url放進appImageURL
    fileReader.onloadend = () => {
      dispatch({
        type: UPLOAD_UPLOADED,
        payload: {
          appImageURL: fileReader.result
        }
      })
    }
    // 把檔案丟出後端
    dispatch(requestSendItToBackend(imageFile));
    // 把瀏覽器裡的檔案清掉
    event.target.value = '';
  }
}
// 把檔案丟到後端
export const requestSendItToBackend = (imageFile) => (dispatch) => {
  // 狀態變成送資料到後端
  dispatch({
    type: SEND_IT_TO_BACKEND_PENDING,
    payload: { messageType: 'uploading' }
  })
  // 用來把image檔案包成form檔檔案格式，以利檔案傳輸
  const formData = new FormData();
  // imageFile[0]是檔案，uploadfile是要fetch給後端的檔案名稱，不是原始檔案名稱
  // 封裝成form格式
  // 這樣格式的好處是，可以async的傳送binery的檔案，一般格式好像只能傳json資料    
  formData.append('uploadfile', imageFile[0]);
  // 把檔案傳給後端
  fetch(`${backendURL}/upload`, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then((backendFileName) => {
      // 收到後端的檔名後，改成相片網址
      const clarifaiImageURL = backendURL + '/' + backendFileName;
      dispatch({
        type: SEND_IT_TO_BACKEND_SUCCESS,
        payload: { backendFileName: backendFileName }
      })
      //把前一次查詢的框框刪掉
      //把完整相片網址送出抓取預測的資料
      dispatch(requestGetFaceData(clarifaiImageURL));
      // entry加1
      dispatch(requestEntryIncrement());
    })
    // 如果送圖給後端出錯的話，重設初始值，然後顯示錯誤。
    .catch(err => {
      dispatch({
        type: SEND_IT_TO_BACKEND_FAILED,
        payload: {
          ...initialResultState,
          messageType: 'fetchError'
        }
      })
    })
  console.log('upload err')
}
// 登出了，就把登入狀態設成false
// 把其他state設成初始的狀態
// 如果是在register的頁面點signin，也需要跑到signin那個component
// sign out的時候locale不更新
export const requestSignOut = (event) => ({
  type: SIGN_OUT,
  payload: {
    ...initialLinkState,
    ...initialUserDataState,
    ...initialMessageState,
    ...initialResultState,
  }
})
// 如果是要去登入頁面，就把註冊頁面狀態設成true
export const requestRegister = (event) => ({
  type: RIGISTER,
  payload: { isRegister: true }
})
// 使用者點下送出人臉辨識之後，這個function會叫後端去把資料庫的使用次數加1
// 然後把加1後的使用者資料回傳回來
// 回傳後，再把web app的使用者資料更新
export const requestEntryIncrement = () => (dispatch, getState) => {
  dispatch({ type: ENTRY_INCREMENT_PENDING })
  fetch(`${backendURL}/image`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getState().userDataReducer.currentUsers)
    }
  )
    .then(res => res.json())
    .then(refreshUser => {
      dispatch({ type: ENTRY_INCREMENT_SUCCESS })
      dispatch(requestLoadUser(refreshUser[0]));
    })
    .catch(err => {
      console.log('back-end error')
      dispatch({ type: ENTRY_INCREMENT_FAILED })
    })
}
// database更新資料之後，抓回來更新web app上目前使用者的state。
// Object.assign用來pass by value
export const requestLoadUser = (fetchUser) => ({
  type: LOAD_USER,
  payload: { currentUsers: Object.assign({}, fetchUser) }
})
