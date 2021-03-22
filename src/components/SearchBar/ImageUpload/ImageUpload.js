import React,{ Component } from 'react';
import {FormattedMessage} from 'react-intl';

//上傳相片的按鈕
class ImageUpload extends Component {
    constructor(props){
        super(props);
        this.state={}
        this.fileInput=React.createRef();
        //設定ref，這邊沒有也能正常跑
    }

    render(){
        return(
            <div className="w-100 w-40-m w-40-l pt3 bt b--black-30 bn-ns pt0-ns">
                <input 
                    type="file" 
                    onChange={this.props.onUpload} 
                    style={{display:'none'}} 
                    ref={(fileInput)=>{this.fileInput=fileInput}} 
                />
                {/* 
                    原本html內設原本的input file顯示的字固定是upload file，而旁邊會顯示檔名，無法修改
                    所以input外觀要改成button比較好看                    
                    點下去後ref的fileInput會得到檔案
                    把fileInput送到this.fileInput中，this.fileInput才能和button有所連接，
                    而這個ImageUpload的component必須是一個class，才會有this，function不會有this，
                    this.fileInput會是一個ref的物件，這個物件有個method是.click()，注意，不是.onClick
                 */}
                <button 
                    onClick={()=>this.fileInput.click()} 
                    className="h2 tc w-100 f5-ns f6 mb2 pointer mv0 bg-dark-gray near-white button-reset br2"
                >
                    <FormattedMessage id='upload' defaultMessage="Upload an image" />
                </button>
                {/* 真正顯示在畫面上的按鈕 */}
            </div>
        )
    }
}

export default ImageUpload;