import React from 'react';
import './ImageRecognize.css'

const ImageRecognized = ({appImageURL,answer,faceBox,probability,errorMessage}) => {
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
                    
                <div className="mt2 flex justify-center">
                        <div className="image-box mh2">
                            <img id="celebrity-pic" alt="celebrity" className="shadow-1 shadow-2-ns shadow-3-m shadow-4-l" src={appImageURL} />
                            {
                                faceBox.map((borderData,index)=>{
                                    return(
                                        <div className="bounding-box br1" style={{
                                            top:borderData.top_row, 
                                            right:borderData.right_col, 
                                            left:borderData.left_col, 
                                            bottom:borderData.bottom_row}}>
                                            <p className="white bg-blue f7 f4-ns b number mv1 br1">{index+1}</p>
                                        </div>
                                    )                                    
                                })                               
                            }
                        </div>
                </div>
            </div>
        )
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
                    </div>
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
                        </div>
                </div>
            </div>
        )
        
    } else if (appImageURL!=='' && errorMessage==='') {
        return(
            <div className="mt2 flex justify-center">
                        <div className="image-box mh2 mw-70">
                        <p className="dark-blue">Please wait a moment!</p>
                        <img id="celebrity-pic" alt="celebrity" className="shadow-1 shadow-2-ns shadow-3-m shadow-4-l" src={appImageURL} />
                        </div>
            </div>
        )
    } else if (errorMessage===''){
        return(
            <div className="mt2 flex justify-center">
                    <div className="image-box mh2 mw-70">
                    <p className="dark-blue">Please input an image URL or upload an image, SmartBrain will tell you who the celebrity in a picture is. {'\n'}
                    Give it a try!</p>
                        {/* <img id="celebrity-pic" alt="celebrity" className="shadow-1" src={appImageURL} /> */}
                    </div>
            </div>
        )
    } else {
        return(
            <div className="mt2 flex justify-center">
                    <div className="image-box mh2 mw-70">
                    <p className="dark-blue">Sorry, there is something wrong. Please try again.</p>
                        {/* <img id="celebrity-pic" alt="celebrity" className="shadow-1" src={appImageURL} /> */}
                    </div>
            </div>
        )
    }
}

export default ImageRecognized;