import React from 'react';
import './ImageRecognize.css'

//傳入要顯示的圖片網址、預測人名、框框資料、人名正確性、錯誤訊息
const ImageRecognized = ({appImageURL,answer,faceBox,probability,errorMessage}) => {
    //有很多人臉資料的話就顯示正確答案
    if (answer.length > 1){
        return(
            <div className="mt1 flex flex-column">
            {/* margin top,text center */}
                <div className="flex justify-center mh2">
                    <p className="mt1 dib v-top f7 f6-ns f5-m f4-l">The celebrities are: </p>
                    <div className="mt1 dib v-top">
                        {
                            answer.map(((name,index)=>{
                                return(
                                    <p className="dark-blue mv0 pl1 pl2-ns  f7 f6-ns f5-m f4-l">{index+1}. {name}</p>
                                )
                            }))                      
                        }
                    </div>
                    {/* 顯示姓名 */}
                    <div className="mt1 dib v-top">
                        {
                            probability.map(((data)=>{
                                return(
                                    <p className="dark-blue mv0 pl3 pl5-ns  f7 f6-ns f5-m f4-l">{data}%</p>
                                )
                            }))                      
                        }
                    </div>
                </div>
                {/* 顯示可能性*/}
                <div className="mt2 flex justify-center">
                        <div className="image-box mh2">
                            <img id="celebrity-pic" alt="celebrity" className="shadow-1 shadow-2-ns shadow-3-m shadow-4-l" src={appImageURL} />
                            {/* 顯示照片 */}
                            {
                                faceBox.map((borderData,index)=>{
                                    return(
                                        <div className="bounding-box br1" style={{
                                            top:borderData.top_row, 
                                            right:borderData.right_col, 
                                            left:borderData.left_col, 
                                            bottom:borderData.bottom_row}}>
                                            <p className="white bg-blue f7 f4-ns b number mv1 br1">{index+1}</p>
                                            {/* 顯示方框的序號
                                            設底色
                                            className number主要是設定序號的位置 */}
                                        </div>
                                    )                                    
                                })                               
                            }
                            {/* 顯示方框 */}
                        </div>
                </div>
            </div>
        )
    //有一個人臉資料的話也顯示正確答案，但不顯示序號
    } else if (answer.length === 1) {
        return(
            <div className="mt1 flex flex-column">
            {/* margin top,text center */}
                <div className="flex justify-center mh2">
                    <p className="mt1 dib v-top  f7 f6-ns f5-m f4-l">The celebrity is: </p>
                    <div className="mt1 dib v-top">
                        {
                            answer.map(((name)=>{
                                return(
                                    <p className="dark-blue mv0 pl1 pl2-ns  f7 f6-ns f5-m f4-l">{name}</p>
                                )
                            }))                      
                        }
                        {/* 顯示人名，不顯示序號 */}
                    </div>
                    <div className="mt1 dib v-top">
                        {
                            probability.map(((data)=>{
                                return(
                                    <p className="dark-blue mv0 pl3 pl5-ns  f7 f6-ns f5-m f4-l">{data}%</p>
                                )
                            }))                      
                        }
                        {/* 顯示可能性，不顯示序號 */}
                    </div>
                </div>
                    
                <div className="mt2 flex justify-center">
                        <div className="image-box mh2">
                            <img id="celebrity-pic" alt="celebrity" className="shadow-1 shadow-2-ns shadow-3-m shadow-4-l" src={appImageURL} />
                            {
                                faceBox.map((borderData)=>{
                                    return(
                                        <div className="bounding-box br1" style={{
                                            top:borderData.top_row, 
                                            right:borderData.right_col, 
                                            left:borderData.left_col, 
                                            bottom:borderData.bottom_row}}>
                                        </div>
                                    )                                    
                                })                               
                            }
                            {/* 顯示方框不顯示序號 */}
                        </div>
                </div>
            </div>
        )
    //網址傳出去了，但是答案還沒傳回來，且沒有錯誤訊息，最可能發生的事是還在傳輸中，所以顯示等待訊息    
    } else if (appImageURL!=='' && errorMessage==='') {
        return(
            <div className="mt2 flex justify-center">
                        <div className="image-box mh2 mw-70">
                        <p className="dark-blue">Please wait a moment!</p>
                        <img id="celebrity-pic" alt="celebrity" className="shadow-1 shadow-2-ns shadow-3-m shadow-4-l" src={appImageURL} />
                        </div>
            </div>
        )
    // 什麼都沒有，那就是什麼都還沒輸入，那就顯示提示語
    } else if (errorMessage===''){
        return(
            <div className="mt2 flex justify-center">
                    <div className="image-box mh2 mw-70">
                    <p className="dark-blue">
                        Please input an image URL or upload an image, SmartBrain will tell you who the celebrity in a picture is. {'\n'}
                        Give it a try!
                    </p>                        
                    </div>
            </div>
        )
    // 剩下的，就是有錯誤訊息的情況，顯示錯誤訊息
    } else {
        return(
            <div className="mt2 flex justify-center">
                    <div className="image-box mh2 mw-70">
                    <p className="dark-blue">Sorry, there is something wrong. Please try again.</p>                    
                    </div>
            </div>
        )
    }
}

export default ImageRecognized;