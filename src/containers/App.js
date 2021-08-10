import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'tachyons';
import Particles from 'react-particles-js';
import { IntlProvider } from 'react-intl'
import {
  requestLanguageDetection,
  requestSetLanguage,
  requestEnterListener,
  requestTyping,
  requestSending,
  requestCheckTypeOfLink,
  requestCapturePage,
  requestGetFaceData,
  requestFaceBoxCalculate,
  requestSubmit,
  requestUpload,
  requestSendItToBackend,
  requestSignOut,
  requestRegister,
  requestLoadUser,
  requestEntryIncrement
} from '../actions'
import Nav from '../components/Nav/Nav.js';
import Logo from '../components/Logo/Logo.js';
import SearchBar from '../components/SearchBar/SearchBar.js';
import ImageRecognized from '../components/ImageRecognized/ImageRecognized.js';
import FormSubmit from './FormSubmit/FormSubmit.js'
import Credit from '../components/Credit/Credit.js';
import './App.css';
import {backendURL} from '../constants';

// 用來把states轉成props，讓App可以用，這要丟給react-redux的API處理，也就是connect
const mapStatesToProps = (state) => (
  {
    // 使用者希望的locale狀態
    locale:state.locale,
    // 對應locale的翻擇資料
    language:state.language,
    //取得輸入的字母
    searchField: state.searchField,
    // 後端檔名
    backendFileName: state.backendFileName,
    // web app的圖片網址
    // clarifaiImageURL:'',
    // 要送給clarifai的網址
    appImageURL: state.appImageURL,
    // 抓回來的資料中，預測的姓名
    predictName: state.predictName,
    // 記錄現在是否已經登入
    isSignIn: state.isSignIn,
    // 記錄是否要去登錄的頁面
    isRegister: state.isRegister,
    // 記錄面部框框的資料
    faceBox: state.faceBox,
    // 預測正確的機率
    probability: state.probability,
    // 目前使用者資料
    currentUsers: state.currentUsers,
    // 訊息內容
    messageType: state.messageType
  }
)
// 用來把actions(dispatch)轉成props，讓App可以用，這要丟給react-redux的API處理，也就是connect
// 各個props的內容請參考actions.js
const mapDispatchToProps = (dispatch) => (
  {
    languageDetection:(()=>dispatch(requestLanguageDetection())),
    onSetLanguage:(event)=>dispatch(requestSetLanguage(event)),
    searchEnterListener:(event)=>dispatch(requestEnterListener(event)),
    onTyping:(event)=>dispatch(requestTyping(event)),
    onSending:(event)=>dispatch(requestSending(event)),
    checkTypeOfLink:(linkUnchecked)=>dispatch(requestCheckTypeOfLink(linkUnchecked)),
    capturePage:(noneImageLink)=>dispatch(requestCapturePage(noneImageLink)),
    getFaceData:(clarifaiImageURL)=>dispatch(requestGetFaceData(clarifaiImageURL)),
    faceBoxCalculate:(boxData)=>dispatch(requestFaceBoxCalculate(boxData)),
    onSubmit:(event)=>dispatch(requestSubmit(event)),
    onUpload:(event)=>dispatch(requestUpload(event)),
    sendItToBackend:(imageFile)=>dispatch(requestSendItToBackend(imageFile)),
    onSignOut:(event)=>dispatch(requestSignOut(event)),
    onRegister:(event)=>dispatch(requestRegister(event)),
    loadUser:(fetchUser)=>dispatch(requestLoadUser(fetchUser)),
    entryIncrement:()=>dispatch(requestEntryIncrement()),
  }
)

class App extends Component {
  //繼承React的library
  //constructor可以初始化一些global的varieble
  constructor(props) {
    //把Component裡的東西copy一份過來，並把props放進去
    super(props);
    // component還沒載入就先執行偵測瀏覽器的locale
    props.languageDetection();
  }

  // 每次狀態更新，render都會重繪一次
  render() {
    const {
      isSignIn,
      locale,
      language,
      onSignOut,
      onRegister,
      isRegister,
      onSetLanguage,
      onSubmit,
      loadUser,
      onSending,
      searchEnterListener,
      onTyping,
      searchField,
      currentUsers,
      onUpload,
      appImageURL,
      predictName,
      faceBox,
      probability,
      messageType
    } = this.props
    
    //登出狀態，且不是在註冊狀態的時候，顯示登入畫面
    if (isSignIn === false) {
      return (
        <IntlProvider locale={locale} messages={language}>
          {/* 直式佈局 */}
          <div className="ph2 w-100 w-90-m w-80-l mw7 center flex flex-column">
            {/* 
              sign in sign out瀏覽列
              登入頁面狀態
              是否執行登出
              是否執行註冊
              註冊頁面狀態
              多國語言設定
            */}
            <Nav
              signInState={isSignIn}
              onSignOut={onSignOut}
              onRegister={onRegister}
              isRegister={isRegister}
              onSetLanguage={onSetLanguage}
            />
            {/* 背景動畫 */}
            <Particles className="particle" />
            {/* 滑鼠移動會動的logo */}
            <Logo />
            {/* 
              註冊的component
              onSubmit負責偵測submit是不是按了
              onSignIn負責更新登入狀態
              loadUser負責把註冊資料request之後收到的response去更新目前使用者的資料
            */}
            <FormSubmit
              isRegister={isRegister}
              onSubmit={onSubmit}
              loadUser={loadUser}
              backendURL={backendURL}
            />
            
            {/* 作者資訊*/}
            <Credit />
          </div>

        </IntlProvider>
      )

    //登入狀態，顯示一般功能畫面
    } else {
      return (
        <IntlProvider locale={locale} messages={language}>
          <div className="ph2 ph0-ns w-100 w-90-m w-80-l mw7 center flex flex-column">
            <Nav
              signInState={isSignIn}
              onSignOut={onSignOut}
              onRegister={onRegister}
              isRegister={isRegister}
              onSetLanguage={onSetLanguage}
            />
            <Particles className="particle" />
            <Logo />
            {/* <div className="flex flex-column items-center mt1 mt3-m mt4-l"> */}
            <SearchBar
              onSending={onSending}
              searchEnterListener={searchEnterListener}
              onTyping={onTyping}
              searchField={searchField}
              currentUsers={currentUsers}
              onUpload={onUpload}
            />
            {/* 
                    搜尋列
                    onSending偵測送出鈕是不是被按了
                    onTyping偵測目前欄位打了那些字
                    searchField控制欄位要顯示什麼字
                    currentUsers將後端傳來更新使用次數後的使用者資料載入目前使用者資料
                  */}
            <ImageRecognized
              appImageURL={appImageURL}
              answer={predictName}
              faceBox={faceBox}
              probability={probability}
              messageType={messageType}
            />
            {/* 相片框 */}
            <Credit />
            {/* 作者資訊 */}
            {/* </div> */}
          </div>
        </IntlProvider>
      )
    }
  }
}
// 和react-redux的api相連接
// connect是一個closure
// mapStatesToProps和mapDispatchToProps先給react-redux的API，然後API再丟進 App裡
export default connect(mapStatesToProps,mapDispatchToProps)(App)
