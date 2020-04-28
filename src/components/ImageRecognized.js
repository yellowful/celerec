import React from 'react';

const ImageRecognized = ({imageUrl,answer}) => {
    if (answer!==''){
        return(
            <div className="mt1 tc flex flex-column justify-center">
            {/* margin top,text center */}
                <div>
                    <p>The celebrity is <span className="f3 dark-blue">{answer}</span>.</p>
                </div>
                <div className="mh6 mw-50 shadow">
                    <img alt="celebrity" src={imageUrl}/>
                </div>
            </div>
        )
    } else {
        return(
            <div className="mt1 tc mh6 mw-50 shadow">
                <img alt="celebrity" src={imageUrl}/>
            </div>
        )
    }
}

export default ImageRecognized;