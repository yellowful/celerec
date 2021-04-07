import React from 'react';
import './ImageRecognize.css'
import MessageBox from '../MessageBox/MessageBox';
import ImageBox from '../ImageBox/ImageBox';

//傳入要顯示的圖片網址、預測人名、框框資料、人名正確性、錯誤訊息
const ImageRecognized = ({ appImageURL, answer, faceBox, probability, messageType }) => {

    //console.log('messageType', messageType);

    return (
        <figure className="mt1 flex flex-column">
            <MessageBox answer={answer} probability={probability} messageType={messageType} />
            {
                appImageURL && <ImageBox answer={answer} faceBox={faceBox} appImageURL={appImageURL} />
            }
        </figure>
    )

}

export default ImageRecognized;