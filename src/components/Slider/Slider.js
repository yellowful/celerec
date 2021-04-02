import React, { useState } from 'react';
import Img1 from './url1.png'
import Img2 from './url2.png'
import Img3 from './url3.png'
import Img4 from './file1.png'
import Img5 from './file2.png'
import Img6 from './file3.png'
import Img7 from './file4.png'
import Img8 from './file5.png'



const Slider = () => {
    const imageArray = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8]
    const [slideState, setSlideState] = useState('')
    const onMouseEnter = () => { setSlideState('stop-slide') }
    const onMouseLeave = () => { setSlideState('') }
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
