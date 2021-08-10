import React from 'react';
import './ImageRecognize.css'
import MessageBox from '../MessageBox/MessageBox';
import ImageBox from '../ImageBox/ImageBox';

// 傳入要顯示的圖片網址、預測人名、框框像素資料、人名正確性、錯誤訊息
// 這是要給App用的
// MessageBox用來顯示人名的table
// ImageBox用來顯示相片和人臉的方框
const ImageRecognized = ({ appImageURL, answer, faceBox, probability, messageType }) => {

    return (
        <figure className="mt1 flex flex-column">
            <MessageBox answer={answer} probability={probability} messageType={messageType} />
            {
                //假設有appImageURL的話，就會render出ImageBox
                appImageURL && <ImageBox answer={answer} faceBox={faceBox} appImageURL={appImageURL} />
            }
        </figure>
    )

}

export default ImageRecognized;