import React, { Component } from 'react';
import 'tachyons';
import Particles from 'react-particles-js';
import {IntlProvider} from 'react-intl'
import Nav from '../components/Nav/Nav.js';
import Logo from '../components/Logo/Logo.js';
import SearchBar from '../components/SearchBar/SearchBar.js';
import ImageRecognized from '../components/ImageRecognized/ImageRecognized.js';
import FormSubmit from './FormSubmit/FormSubmit.js'
import Credit from '../components/Credit/Credit.js';
import './App.css';
import English from '../lang/en.json';
import Mandarin from '../lang/zh.json';
import Spanish from '../lang/es.json';

//const backendURL = 'http://localhost:3005';//for developement only

const backendURL = 'https://quiet-retreat-05063.herokuapp.com'

const initialState = {
  searchField:'',
  //取得輸入的字母
  backendFileName:'',
  appImageURL:'',
  //web app的圖片網址
  //clarifaiImageURL:'',
  //要送給clarifai的網址
  predictName:[],
  //抓回來的資料中，預測的姓名
  isSignIn:false,
  //記錄現在是否已經登入
  onRegister:false,
  //記錄是否要去登錄的頁面
  faceBox:[],
  //記錄面部框框的資料
  probability:[],
  currentUsers:{},
  errorMessage:''
}

 class App extends Component{
  constructor(){
    super();
    this.state = {
      searchField:'',
      //取得輸入的字母
      backendFileName:'',
      appImageURL:'',
      //web app的圖片網址
      //clarifaiImageURL:'',
      //要送給clarifai的網址
      predictName:[],
      //抓回來的資料中，預測的姓名
      isSignIn:false,
      //記錄現在是否已經登入
      onRegister:false,
      //記錄是否要去登錄的頁面
      faceBox:[],
      //記錄面部框框的資料
      probability:[],
      currentUsers:{},
      errorMessage:''
    }
    const languageDetection = () => {
      if(navigator.language.includes('zh')){
        this.state.locale='zh-TW';
        this.state.language= Object.assign({},Mandarin);
      } else if (navigator.language.includes('es')) {
        this.state.locale='es-ES';
        this.state.language= Object.assign({},Mandarin);
      } else {
        this.state.locale='en-US';
        this.state.language= Object.assign({},English);
      }
    }
    languageDetection();
  } 
  //繼承React的library
  //初始化一些global的varieble
 
  onSetLanguage = (event) => {
    switch(event) {
      case 'zh':
        this.setState({locale:'zh-TW',language:Mandarin})
        break;
      case 'es':
        this.setState({locale:'es-ES',language:Spanish})
        break;
      default:
        this.setState({locale:'en-US',language:English})
    }
  }

  searchEnterListener = (event) => {
    if(event.key==='Enter'){
      this.onSending();
    }
  }
  //監聽search bar是否已經按下enter，用來取代send按鈕

  onTyping = (event) => {
    this.setState({searchField:event.target.value});
  }
  //抓取搜尋欄的完整字串

  onSending = () => {
    if (this.state.searchField){
      this.setState({
        faceBox:[],
        backendFileName:'',
        searchField:'',
        appImageURL:this.state.searchField,
        errorMessage:''
      });
      //把前一次查詢的框框刪掉
      //如果前一次是upload，把backendFileName清空，空字串可以讓後端知道是input url，不用刪暫存的image
      //把輸入欄清空，以利下次輸入
      //更新完整網址
      //清空錯誤訊息，以便如果沒有錯誤時，正確答案能在ImageRecoginzed被正確顯示
      this.getFaceData(this.state.searchField);
      //把完整網址送出抓取預測的資料
      this.entryIncrement();
      //entries加一
    } else {
      this.setState({predictName:[],faceBox:[],probability:[],appImageURL:'',errorMessage:'submit error'});
      console.log('submit error')
      //輸入空白的話顯示錯誤訊息
    }
  }
  //監聽送出鍵是否被點，被點的話就去抓資料

  getFaceData = (clarifaiImageURL) => {
    fetch(`${backendURL}/imageurl`,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({
        'clarifaiImageURL':clarifaiImageURL,
        'backendFileName':this.state.backendFileName
      })
    })
    //向後端傳送要辨識端圖片的網址
    .then(data=>data.json())
    //JSON格式轉換
    .then(response => {
        const numberOfCelebrities = response.rawData.outputs[0].data.regions.length;
        //回傳的資料正常的話，抽出名字、方框資料、可能性
        if(numberOfCelebrities){
          let name = [];
          let boxData = [];
          let probability = [];
          for(let i=0;i<numberOfCelebrities;i++){
            name.push(response.rawData.outputs[0].data.regions[i].data.concepts[0].name);
            //回來的資料直接就是物件了，不用再parse了
            //取出預測的姓名（留預測度最高的一個而已）
            boxData.push(this.faceBoxCalculate(response.rawData.outputs[0].data.regions[i].region_info.bounding_box));
            //取回預測人臉位置的方框資料，是4個0-1之間的比例數字，所以不管圖片大小如何，比例都一樣
            probability.push(
              Math.round(response.rawData.outputs[0].data.regions[i].data.concepts[0].value*10000)/100
            );
            //取回預測機率，百分比取到小數點後兩位
          }
          this.setState({faceBox:boxData.concat(), predictName:name.concat(), probability:probability.concat()});
          //更新人臉方框數值、預測的姓名、秀機率
        } else {
          //假設回傳的資料有誤，最可能是傳的相片不是人臉，把這幾個資料重設初始值，然後顯示錯誤
          this.setState({predictName:[],faceBox:[],probability:[],appImageURL:'',errorMessage:'no face'})
          console.log('no face')
          //如果後端沒有回傳辨識結果，可能發生上傳的圖檔不是人臉，在console顯示錯誤訊息。
        }
    })
    .catch(err=>{
      this.setState({predictName:[],faceBox:[],probability:[],appImageURL:'',errorMessage:'fetch error'})
      console.log('fetch error')
    });//如果後端沒有response，顯示傳輸錯誤。
  }
  //把完整網址送出抓取預測的資料
  
  faceBoxCalculate = (boxData)=>{
    const imageBox = document.querySelector('#celebrity-pic');
    //抓DOM的node，找到圖片以利抓出圖片畫素
    //用.getElementById()同樣可行
    let {top_row, left_col, bottom_row, right_col} = boxData;
    //destucture，將方框物件轉成變數，以利計算
    boxData.top_row = imageBox.offsetHeight*top_row;
    //算出頂邊的像素
    //這裏要注意的是，在React中，取得圖片的height竟然不是.height，而是.offsetHeight
    boxData.left_col = imageBox.offsetWidth*left_col;
    //算出左邊框距離相片左邊框幾像素
    boxData.bottom_row = imageBox.offsetHeight*(1-bottom_row);
    //API給的是從原相片頂端到框框底端的距離是原相片的幾倍(0-1的數值)，而css需要的是框框底部到原相片底部的像素
    boxData.right_col = imageBox.offsetWidth*(1-right_col);
    //API給的是從原相片左邊到框框右邊的距離是原相片的幾倍(0-1的數值)，而css需要的是框框右邊到原相片右邊的像素
    return boxData;
    //把像素的物件取代原來的比例數值的物件，回傳回去
  }
  //將人臉方框的比例，換算成像素，供方框四個邊位移用

  onSubmit = () => {
    this.setState({isSignIn:true, onRegister:false});
  }
  //註冊和登入時的送出鍵
  //點下時，登入狀態會設成true，註冊頁面狀態會設成false

  onUpload = (event) =>{
    event.preventDefault();
    //取消html點了upload file後預設行為，例如離開網頁了，
    //改作我們定義的onUpload做的事情。
    //檔案內容，是一個blob物件    
    const imageFile = event.target.files;
    if(imageFile.length){
      this.setState({
        faceBox:[],
        backendFileName:'',
        searchField:'',
        appImageURL:'',
        errorMessage:''
      });
      //先把前一次搜尋清空

      const fileReader = new FileReader();
      //用來處理讀取檔案用，我們需要他裡面的method
      fileReader.readAsDataURL(imageFile[0]);
      //把blob物件所在記憶體，轉成url的形式
      fileReader.onloadend = () => {        
        this.setState({faceBox:[],appImageURL:fileReader.result});
      }//在檔案載入後，把url放進appImageURL
      this.sendItToBackend(imageFile);
      //把檔案丟出後端
      event.target.value='';
    }
  }

sendItToBackend = (imageFile)=>{
    const formData = new FormData();
    //用來把image檔案包成form檔檔案格式，以利檔案傳輸
    formData.append('uploadfile',imageFile[0]);
    //imageFile[0]是檔案，uploadfile是要fetch給後端的檔案名稱，不是原始檔案名稱
    //封裝成form格式    
    fetch(`${backendURL}/upload`,{
      method:'POST',
      body:formData
    })
    //把檔案傳給後端
    .then(res=>res.json())
    .then((backendFileName)=>{
      const clarifaiImageURL=backendURL+'/'+backendFileName;
      this.setState({backendFileName:backendFileName});
      //把前一次查詢的框框刪掉
      this.getFaceData(clarifaiImageURL);
      //把完整網址送出抓取預測的資料
      this.entryIncrement();    
    })
    .catch(err=>{
      this.setState({
        predictName:[],
        faceBox:[],
        probability:[],
        appImageURL:'',
        errorMessage:'upload err'
      })
      console.log('upload err')
    })//如果送圖給後端出錯的話，重設初始值，然後顯示錯誤。
  }

  onSignOut=() =>{
    this.setState(initialState);    
  }
  //登出了，就把登入狀態設成false
  //把其他state設成初始的狀態
  //如果是在register的頁面點signin，也需要跑到signin那個component

  onRegister=() => {
    this.setState({onRegister:true})
  }
  //如果是要去登入頁面，就把註冊頁面狀態設成true

  loadUser = (fetchUser) => {
    this.setState({currentUsers:fetchUser});
  }
  //database更新資料之後，抓回來更新web app上目前使用者的state。

  entryIncrement = () =>{
    fetch(`${backendURL}/image`,
      {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(this.state.currentUsers)
      }
    )
    .then(res=>res.json())
    .then(refreshUser=>{
      this.loadUser(refreshUser[0]);
    })
    .catch(err=>console.log('back-end error'))
  }
  //使用者點下送出人臉辨識之後，這個function會叫後端去把資料庫的使用次數加1
  //然後把加1後的使用者資料回傳回來
  //回傳後，再把web app的使用者資料更新
  
  render (){
    if(this.state.isSignIn===false){
        return(
          <IntlProvider locale={this.state.locale} messages={this.state.language}>
            <div className="flex flex-column">
              <Nav 
                signInState={this.state.isSignIn} 
                onSignOut={this.onSignOut}  
                onRegister={this.onRegister} 
                isRegister={this.state.onRegister}
                onSetLanguage={this.onSetLanguage}
              />
              {/* sign in sign out瀏覽列
              登入頁面狀態
              是否執行登出
              是否執行註冊
              註冊頁面狀態 */}
              <Particles className="particle" />
              {/* 背景動畫 */}
              <Logo />
              {/* 滑鼠移動會動的logo */}
              <FormSubmit 
                onRegister={this.state.onRegister} 
                onSubmit={this.onSubmit} 
                loadUser={this.loadUser} 
                backendURL={backendURL}                
              />
              {/* 
                註冊的component
                onSubmit負責偵測submit是不是按了
                onSignIn負責更新登入狀態
                loadUser負責把註冊資料request之後收到的response去更新目前使用者的資料
              */}
              <div className="mr2 mr5-ns mt1 mt2-l tr fw1 f7">
                <Credit />
              </div>
              {/* 作者資訊*/}
            </div>
            
          </IntlProvider>
          // 直式佈局
        )
//登出狀態，且不是在註冊狀態的時候，顯示登入畫面

    } else {
      return(
        <IntlProvider locale={this.state.locale} messages={this.state.language}>
          <div className="flex flex-column">
            <Nav 
                signInState={this.state.isSignIn} 
                onSignOut={this.onSignOut}  
                onRegister={this.onRegister} 
                isRegister={this.state.onRegister}
                onSetLanguage={this.onSetLanguage}
              />
            <Particles className="particle" />        
            <Logo />
                <div className="flex flex-column items-center mt1 mt3-m mt4-l">
                  <SearchBar 
                    onSending={this.onSending} 
                    searchEnterListener={this.searchEnterListener} 
                    onTyping={this.onTyping} 
                    searchField={this.state.searchField} 
                    currentUsers={this.state.currentUsers} 
                    onUpload={this.onUpload}          
                  />
                  {/* 
                    搜尋列
                    onSending偵測送出鈕是不是被按了
                    onTyping偵測目前欄位打了那些字
                    searchField控制欄位要顯示什麼字
                    currentUsers將後端傳來更新使用次數後的使用者資料載入目前使用者資料
                  */}
                  <ImageRecognized 
                    appImageURL={this.state.appImageURL} 
                    answer={this.state.predictName} 
                    faceBox={this.state.faceBox} 
                    probability={this.state.probability} 
                    errorMessage={this.state.errorMessage}                     
                  />
                  {/* 相片框 */}
                  <div className="tr w-90 w-70-m w-60-l mt1 mt2-l tr fw1 f7">
                    <Credit />
                  {/* 作者資訊 */}
                  </div>
                </div>

          </div>
        </IntlProvider>
      )
    }
    //登入狀態，顯示一般功能畫面
  }
  //每次狀態更新，render都會重繪一次
}

export default App;
                                                                                     