import React from 'react'
import {FormattedMessage} from 'react-intl'

//播放影片
const Introduction =({onMoreInfo, onClickVideo, displayVideo})=>{
    //打開播放影片的視窗
    if(displayVideo){
        return( 
            <div className="absolute db fixed top-0 left-0 w-100 h-100"> 
                <iframe 
                    width={window.innerWidth} 
                    height={window.innerHeight} 
                    title="video" 
                    src="https://www.youtube.com/embed/excc4ylTMvs?autoplay=1&mute=1&enablejsapi=1" 
                    frameborder="0" 
                    allowFullScreen
                />
                {/* 全螢幕
                網址？後面是桌面版自動播放的功能的參數
                youtube不支援手機自動播放 */}
                <button 
                    className="orange tc f4 f3-ns f2-l b br2 w2 w3-l h2 h3-l b pa1 ba b--black bg-gray o-80 absolute top-1 top-2-l right-1 right-2-l grow pointer"
                    onClick={onClickVideo}
                >X</button>
                {/* 關閉視窗的按鈕 */}
            </div>
        )
    //關掉播放影片的視窗
    } else {
        return(
            <div className="flex flex-column justify-start mt2 mt4-ns">  
                <p className="dark-blue">
                <FormattedMessage id='introduction' />
                </p>
                {/* 顯示介紹 */}
                <button 
                    className="br1 tc f6 w-60 w-30-ns w-20-l b ph3 pv2 ba b--black bg-transparent grow pointer"
                    onClick={onMoreInfo}
                >
                    <FormattedMessage id='info' />
                </button>    
                {/* 打開播放影片視窗的按鈕*/}
            </div>
        )
    }    
}

export default Introduction;