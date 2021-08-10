import React,{ Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

// 要給SearchBar用的
// 上傳相片的按鈕
class ImageUpload extends Component {
    constructor(props){
        super(props);
        this.state={}
        //設定ref，這和下面callback ref的程式碼重覆，二擇一就好了。
        //this.fileInput=React.createRef();
    }

    render(){
        return(
            <div className="w-100 w-40-m w-40-l pt3 bt b--black-30 bn-ns pt0-ns">
                {/* 
                    原本html內設原本的input file顯示的字固定是upload file，而旁邊會顯示檔名，無法修改
                    所以input外觀要改成button比較好看                    
                    this.fileInput代表的就是這個type是file的input
                    這個所以this.fileInput會有原來DOM element的API，例如：.click()，注意，不是React的.onClick
                    button點下去後會啟動file input這個DOM element的API .click()，然後就觸發這個DOM element的onChange了
                    所以檔案就會透過this.props.onUpload上傳
                    而這個input的element是一個DOM element，或是必須是一個class component，因為function component沒有instance。
                */}
                <input 
                    type="file" 
                    onChange={this.props.onUpload} 
                    style={{display:'none'}} 
                    ref={(element)=>{this.fileInput=element}} 
                />
                
                {/* 真正顯示在畫面上的按鈕 */}
                <button 
                    onClick={()=>this.fileInput.click()} 
                    className="h2 tc w-100 f5-ns f6 mb2 pointer mv0 bg-dark-gray near-white button-reset br2"
                >
                    <FormattedMessage id='upload' defaultMessage="Upload" />
                    {' '}
                    <FontAwesomeIcon icon={faCamera} />
                </button>
            </div>
        )
    }
}

export default ImageUpload;