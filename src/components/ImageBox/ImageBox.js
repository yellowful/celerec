import React from 'react'

const ImageBox = ({ answer, faceBox, appImageURL }) => {
    return (
        <div className="image-box mv2">
            <img id="celebrity-pic" alt="celebrity" className="shadow-1 shadow-2-ns shadow-3-m shadow-4-l" src={appImageURL} />
            {
                faceBox.map((borderData, index) => {
                    return (
                        <div
                            key={`box-${index}`}
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
