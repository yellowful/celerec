import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Nav from '../components/Nav.js';
import Logo from '../components/Logo.js';
import SearchBar from '../components/SearchBar.js';
import ImageRecognized from '../components/ImageRecognized.js';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: 'a40220c771334acaafb67dd020f7f9d0'
 });

class App extends Component{
  constructor(){
    super();
    this.state = {
      searchField:'',
      URL:'https://samples.clarifai.com/celebrity.jpeg',
      predictName:''
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
      this.setState({predictName:name});
      this.setState({searchField:''});
    });
  }

  
  render (){
    return(
      <div className="flex flex-column">
        <Nav />
        <Logo />
        <SearchBar onSending={this.onSending} onTyping={this.onTyping} searchField={this.state.searchField}/>
        <ImageRecognized imageUrl={this.state.URL} answer={this.state.predictName}/>
      </div>
    )
  }
}

export default App;
                                                                                     