import React,{ Component } from 'react';


class ImageUpload extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <div>
                <input 
                    type="file" 
                    onChange={this.props.onUpload} 
                    style={{display:'none'}} 
                    ref={(fileInput)=>{this.fileInput=fileInput}} 
                />
                <button 
                    onClick={()=>this.fileInput.click()} 
                    className="fl w6 tc w7-ns w9-m f5-ns f6 mh2 mh7-ns pointer
                ">
                    Upload an image
                </button>
            </div>
        )
    }
}



export default ImageUpload;