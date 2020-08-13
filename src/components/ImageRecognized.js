import React from 'react';
import './ImageRecognize.css'

const ImageRecognized = ({appImageUrl,answer,faceBox}) => {

    if (answer!==''){
        return(
            <div className="mt1 tc flex flex-column justify-center">
            {/* margin top,text center */}
                <div>
                    <p>The celebrity is <span className="f3 dark-blue">{answer}</span>.</p>
                </div>
                <div className="outer-box">
                    <div className="image-box">
                        <img id="celebrity-pic" alt="celebrity" src={appImageUrl} />
                        <div className="bounding-box" style={{
                            top:faceBox.top_row, 
                            right:faceBox.right_col, 
                            left:faceBox.left_col, 
                            bottom:faceBox.bottom_row}}>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className="mt2 flex justify-center">
                <div className="image-box">
                    <img id="celebrity-pic" alt="celebrity" src={appImageUrl} />
                </div>
            </div>
        )
    }
}

export default ImageRecognized;