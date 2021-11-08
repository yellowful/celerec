import React from 'react'

// 是要給ImageRecognized用的
// answer是預測的名字，用answer的數量來決定要不要顯示方框的序號
// faceBox是方框的像素，可以用map來畫出方框
// appImageURL是圖片的URI，可以用來顯示圖片
const ImageBox = ({ answer, faceBox, appImageURL }) => {
    return (
        <div className="image-box mv2">
            <img id="celebrity-pic" alt="celebrity" className="shadow-1 shadow-2-ns shadow-3-m shadow-4-l" src={appImageURL} />
            {
                faceBox.map((borderData, index) => {
                    return (
                        <div
                            key={`box-${index}`}
                            title="bounding box of face"
                            className="bounding-box br1"
                            style={{
                                top: borderData.top_row,
                                right: borderData.right_col,
                                left: borderData.left_col,
                                bottom: borderData.bottom_row
                            }}
                        >
                            {
                                answer.length > 1 ?
                                    <p className="white bg-blue f7 f4-ns b number mv1 br1">{index + 1}</p>
                                    :
                                    null
                            }
                        </div>
                    )
                })

            }
        </div>
    )
}

export default ImageBox
