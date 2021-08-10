import React, { useState } from 'react';
import Img1 from './url1.png'
import Img2 from './url2.png'
import Img3 from './url3.png'
import Img4 from './file1.png'
import Img5 from './file2.png'
import Img6 from './file3.png'
import Img7 from './file4.png'
import Img8 from './file5.png'

// 給FormSubmit用的
// 顯示使用的動畫
const Slider = () => {
    // 使用8張圖片，以產生輪播效果
    const imageArray = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8]
    // 記錄滑鼠是否滑入輪播區的狀態
    const [slideState, setSlideState] = useState('')
    // 滑鼠如果滑進輪播區，輪播暫停
    const onMouseEnter = () => { setSlideState('stop-slide') }
    // 滑鼠如果滑出輪播區，輪播繼續
    const onMouseLeave = () => { setSlideState('') }
    // 手機touch輪播區，就改變輪播狀態
    const onTouchEnd = () => {
        if (slideState) {
            setSlideState('')
        } else {
            setSlideState('stop-slide')
        }
    }
    // 記錄截圖是否已被載入的狀態
    // 初始值是一個8個item的array，每一個item都是false
    const [isLoaded,setLoadedState] = useState(new Array(8).fill(false))
    // 如果圖片被載入了，就把對應的載入狀態改成true
    // 是一個closure，會記得各別i是多少，各別的newArray是多少，等於有各自的onLoad
    const onLoad = (i) => () => {
        // 將狀態複制一份，以免動到原狀態
        const newArray = isLoaded.slice();
        // 新狀態對應的item改成true
        newArray[i] = true;
        // 設定狀態存檔
        setLoadedState(newArray);
    }

    return (
        <div className="w-100">
            {/* 
                coverflow設定children都重疊在一起
                並設定延遲的秒數
                slideState如果是stop-slide的話就會暫停
             */}
            <div
                id="cover"
                className={`coverflow ${slideState}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onTouchEnd={onTouchEnd}
            >
                {
                    // render出8張截圖
                    // 如果isLoaded的array裡面，有false的話，就是有圖片還沒載入完成，這時候就把className設成dn，也就是把圖片先隱藏起來不要顯示
                    // onLoad是一個closure,會把對應的載入狀態改成true
                    imageArray.map((image, i) => {
                        return (
                            <div key={i}>
                                <img 
                                    className={
                                        isLoaded.includes(false) ?
                                            'dn'
                                            :
                                            ''
                                    }
                                    src={image} 
                                    alt={`slide ${i}`} 
                                    onLoad={onLoad(i)}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Slider
