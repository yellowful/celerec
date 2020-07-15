import React, { Component } from 'react';
import 'tachyons';
import Particles from 'react-particles-js';
//import Clarifai from 'clarifai';
import Nav from '../components/Nav.js';
import Logo from '../components/Logo.js';
import SearchBar from '../components/SearchBar.js';
import ImageRecognized from '../components/ImageRecognized.js';
import FormSubmit from '../components/FormSubmit.js'
import Credit from '../components/Credit.js';
import './App.css';

const backendURL = 'https://quiet-retreat-05063.herokuapp.com'

const initialState = {
  searchField:'',
  //取得輸入的字母
  URL:'https://samples.clarifai.com/celebrity.jpeg',
  //送出鍵點出後，取得完整網址
  predictName:'',
  //抓回來的資料中，預測的姓名
  isSignIn:false,
  //記錄現在是否已經登入
  onRegister:false,
  //記錄是否要去登錄的頁面
  faceBox:{},
  //記錄面部框框的資料
  currentUsers:{}
}

 class App extends Component{
  constructor(){
    super();
    this.state = {
      searchField:'',
      //取得輸入的字母
      URL:'https://samples.clarifai.com/celebrity.jpeg',
      //送出鍵點出後，取得完整網址
      predictName:'',
      //抓回來的資料中，預測的姓名
      isSignIn:false,
      //記錄現在是否已經登入
      onRegister:false,
      //記錄是否要去登錄的頁面
      faceBox:{},
      //記錄面部框框的資料
      currentUsers:{}
    }
  } 
  //繼承React的library
  //初始化一些global的varieble
 
  onTyping = (event) => {
    this.setState({searchField:event.target.value});
  }
  //抓取搜尋欄的字串

  onSending = () => {
    this.getFaceData(this.state.searchField);
    //把完整網址送出抓取預測的資料
    this.setState({URL:this.state.searchField});
    //更新完整網址
    this.entryIncrement();
  }
  //監聽送出鍵是否被點，被點的話就去抓資料

  getFaceData= (URL) => {
    fetch(`${backendURL}/imageurl`,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({'URL':URL})
    })
    //向後端傳送要辨識端圖片的網址
    .then(data=>data.json())
    .then(response => {
      const name = response.rawData.outputs[0].data.regions[0].data.concepts[0].name;
      //回來的資料直接就是物件了，不用再parse了
      //取出預測的姓名（留預測度最高的一個而已）
      const boxData = this.faceBoxCalculate(response.rawData.outputs[0].data.regions[0].region_info.bounding_box);
      //取回預測人臉位置的方框資料，是4個0-1之間的數字，所以不管圖片大小如何，比例都一樣
      this.setState({faceBox:boxData})
      this.setState({predictName:name});
      //更新人臉方框數值、預測的姓名
      this.setState({searchField:''});
      //把輸入欄清空，以利下次輸入
    })
    .catch(err=>console.log('fetch error'));
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



  onSignOut=() =>{
    this.setState(initialState);
    //寫這行是因為，如果是在register的頁面點signin，也需要跑到signin那個component
  }
  //登出了，就把登入狀態設成false
  //把其他state設成初始的狀態

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
          <div className="flex flex-column">
            <Nav 
              signInState={this.state.isSignIn} 
              onSignOut={this.onSignOut}  
              onRegister={this.onRegister} 
              isRegister={this.state.onRegister}
            />
            <Particles className="particle" />
            {/* sign in sign out瀏覽列 */}
            <Logo />
            <FormSubmit onRegister={this.state.onRegister} onSubmit={this.onSubmit} loadUser={this.loadUser} backendURL={backendURL}/>
            {/* 
              註冊的component
              onSubmit負責偵測submit是不是按了
              onSignIn負責更新登入狀態
              loadUser負責把註冊資料request之後收到的response去更新目前使用者的資料
             */}
            <Credit />
          </div>
          // 直式佈局
        )
//登出狀態，且不是在註冊狀態的時候，顯示登入畫面

    } else {
      return(
        <div className="flex flex-column">
          <Nav 
              signInState={this.state.isSignIn} 
              onSignOut={this.onSignOut}  
              onRegister={this.onRegister} 
              isRegister={this.state.onRegister}
            />
          <Particles className="particle" />
          <Logo />
          <div className="flex flex-column justify-center">
            <SearchBar onSending={this.onSending} onTyping={this.onTyping} searchField={this.state.searchField} currentUsers={this.state.currentUsers}/>
            {/* 
              搜尋列
              onSending偵測送出鈕是不是被按了
              onTyping偵測目前欄位打了那些字
              searchField控制欄位要顯示什麼字
              currentUsers將後端傳來更新使用次數後的使用者資料載入目前使用者資料
            */}
            <ImageRecognized imageUrl={this.state.URL} answer={this.state.predictName} faceBox={this.state.faceBox}/>
            {/* 相片框 */}
          </div>
          <Credit />
        </div>
      )
    }
    //登入狀態，顯示一般功能畫面
  }
  //每次狀態更新，render都會重繪一次
}

export default App;
                                                                                     