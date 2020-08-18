import React from 'react';
import './ImageRecognize.css'

const ImageRecognized = ({appImageURL,answer,faceBox}) => {

    if (answer!==''){
        return(
            <div className="mt1 flex flex-column">
            {/* margin top,text center */}
                    <p className="tc">The celebrity is <span className="f3 dark-blue">{answer}</span>.</p>
                <div className="mt2 flex justify-center">
                        <div className="image-box mh2">
                            <img id="celebrity-pic" alt="celebrity" src={appImageURL} />
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
                    <div className="image-box mh2">
                        <img id="celebrity-pic" alt="celebrity" src={appImageURL} />
                    </div>
            </div>
        )
    }
}

export default ImageRecognized;