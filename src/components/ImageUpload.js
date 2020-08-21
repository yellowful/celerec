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
                {/* 
                    input外觀要改成button比較好看
                    點下去後ref的fileInput會得到檔案
                    把fileInput送到this.fileInput中，this.fileInput才能和button有所連接，
                    而這個ImageUpload的component必須是一個class，才會有this，function不會有this，
                    this.fileInput會是一個ref的物件，這個物件有個method是.click()，注意，不是.onClick
                 */}
                <button 
                    onClick={()=>this.fileInput.click()} 
                    className="fl w6 tc w7-ns w9-m f5-ns f6 ma2 mh7-ns pointer
                ">
                    Upload an image
                </button>
            </div>
        )
    }
}



export default ImageUpload;