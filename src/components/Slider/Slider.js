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
    return (
        <div className="w-100">
            <div
                id="cover"
                className={`coverflow ${slideState}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onTouchEnd={onTouchEnd}
            >
                {
                    imageArray.map((image, i) => {
                        return (
                            <div key={i}>
                                <img src={image} alt={`slide ${i}`} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Slider
