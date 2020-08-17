import React,{ Component } from 'react';


class ImageUpload extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <div>
                <input type="file" onChange={this.props.onUpload} style={{display:'none'}} ref={(fileInput)=>{this.fileInput=fileInput}} />
                <button onClick={()=>this.fileInput.click()} className="fl w4 tc w6-ns w8-m f5-ns f6 mh2 mh7-ns ml1 pointer">Upload an image</button>

            </div>
        )
    }
}



export default ImageUpload;