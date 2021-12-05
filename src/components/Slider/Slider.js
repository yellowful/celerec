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
  // 記錄已被載入的截圖的數目，初始值是0
  const [isLoaded, setLoadedState] = useState(0)
  // 這是個放在祖仙的event listener
  // 用來當event delegation來處理監聽8個相片的子孫是否已載入
  // 每載入一圖就+1，isLoaded是8的時候代表全部載入了
  const onLoad = (event) => {
    // 祖仙和子孫任何element有一個onLoad的時候，這個event handler就會被trigger
    // 祖仙在bubbling階段才會被trigger
    // 被trigger的時候，event target代表的仍是onLoad的那個element，也就是很可能是我們要的子孫
    // 所以如果onLoad的那個element是img的話，那麼我們的相片isLoaded的狀態就可以加1了
    if (event.target.tagName.toLowerCase() === 'img') {
      setLoadedState(isLoaded + 1);
    }
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
        title="slide"
        className={`coverflow ${slideState}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchEnd={onTouchEnd}
        onLoad={onLoad}
      >
        {
          imageArray.map((image, i) => {
            return (
              <div key={i}>
                <img
                  className={
                    // 如果全部相片都loaded了，isLoaded就會是8，那麼就不用隱藏了
                    isLoaded < 8 ?
                      'dn'
                      :
                      ''
                  }
                  src={image}
                  alt={`slide ${i}`}
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
