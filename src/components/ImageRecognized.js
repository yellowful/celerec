import React from 'react';
import './ImageRecognize.css'

const ImageRecognized = ({appImageURL,answer,faceBox}) => {
    if (answer.length!==0){
        return(
            <div className="mt1 flex flex-column">
            {/* margin top,text center */}
                <div className="flex justify-center mh2 v-top">
                    <p className="mt1 dib v-top">The celebrity is: </p>
                    <div className="mt1 dib v-top">
                        {
                            answer.map(((name,index)=>{
                                return(
                                    <p className="dark-blue mv0 pl1 pl2-ns">{index+1}. {name} {'\n'}</p>
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
    } else {
        return(
            <div className="mt2 flex justify-center">
                    <div className="image-box mh2">
                        <img id="celebrity-pic" alt="celebrity" className="shadow-1" src={appImageURL} />
                    </div>
            </div>
        )
    }
}

export default ImageRecognized;