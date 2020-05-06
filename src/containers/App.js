import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Nav from '../components/Nav.js';
import Logo from '../components/Logo.js';
import SearchBar from '../components/SearchBar.js';
import ImageRecognized from '../components/ImageRecognized.js';
import 'tachyons';
import Register from '../components/Register.js';
import SignIn from '../components/SignIn.js';

const app = new Clarifai.App({
  apiKey: 'a40220c771334acaafb67dd020f7f9d0'
 });

class App extends Component{
  constructor(){
    super();
    this.state = {
      searchField:'',
      URL:'https://samples.clarifai.com/celebrity.jpeg',
      predictName:'',
      isSignIn:false,
      onRegister:false,
      faceBox:{}
    }
  }
 
  onTyping = (event) => {
    this.setState({searchField:event.target.value});
  }

  onSending = () => {
    this.getFaceData(this.state.searchField);
    this.setState({URL:this.state.searchField});
  }

  getFaceData= (URL) => {
    app.models.predict("e466caa0619f444ab97497640cefc4dc",URL)
    .then(response => {
      const name = response.rawData.outputs[0].data.regions[0].data.concepts[0].name;
      const boxData = this.faceBoxCalculate(response.rawData.outputs[0].data.regions[0].region_info.bounding_box);
      console.log(boxData);
      this.setState({faceBox:boxData})
      this.setState({predictName:name});
      this.setState({searchField:''});
    });
  }
  
  
  faceBoxCalculate = (boxData)=>{
    const imageBox = document.querySelector('#celebrity-pic');
    let {top_row, left_col, bottom_row, right_col} = boxData;
    boxData.top_row = imageBox.offsetHeight*top_row;
    boxData.left_col = imageBox.offsetWidth*left_col;
    boxData.bottom_row = imageBox.offsetHeight*(1-bottom_row);
    boxData.right_col = imageBox.offsetWidth*(1-right_col);
    return boxData;
  }

  onSubmit = () => {
    this.setState({isSignIn:true});
    this.setState({onRegister:false});
  }

  onSignIn=() => {
    this.setState({isSignIn:true})
  }

  onSignOut=() =>{
    this.setState({isSignIn:false})
  }

  onRegister=() => {
    this.setState({onRegister:true})
  }
  
  render (){
    if(this.state.isSignIn===false){
      if(this.state.onRegister===true){
        return(
          <div className="flex flex-column">
            <Nav 
              signInState={this.state.isSignIn} 
              onSignOut={this.onSignOut}  
              onRegister={this.onRegister} 
              isRegister={this.state.onRegister}
            />
            <Logo />
            <Register onSubmit={this.onSubmit} onSignIn={this.onSignIn}/>
          </div>
        )  
      } else {
        return(
          <div className="flex flex-column">
            <Nav 
              signInState={this.state.isSignIn} 
              onSignOut={this.onSignOut}  
              onRegister={this.onRegister} 
              isRegister={this.state.onRegister}
            />
            <Logo />
            <SignIn onSubmit={this.onSubmit} />
          </div>
        )  
      }
    } else {
      return(
        <div className="flex flex-column">
          <Nav 
              signInState={this.state.isSignIn} 
              onSignOut={this.onSignOut}  
              onRegister={this.onRegister} 
              isRegister={this.state.onRegister}
            />
          <Logo />
          <div className="flex flex-column justify-center">
            <SearchBar onSending={this.onSending} onTyping={this.onTyping} searchField={this.state.searchField}/>
            <ImageRecognized imageUrl={this.state.URL} answer={this.state.predictName} faceBox={this.state.faceBox}/>
          </div>
        </div>
      )
    }
  }
}

export default App;
                                                                                     