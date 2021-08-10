import React from 'react'
import AnswerBox from './AnswerBox'
import StateMessage from './StateMessage'

// 要給App用的
// 如果有人名的資料了，就用AnswerBox畫出人名的表格
// 如果還沒有人名的資料，就用StateMessage顯現目前抓取或是辨識的狀態
const MessageBox = ({ answer, probability, messageType }) => {
    return (
        messageType === 'showResult' ?
            <AnswerBox answer={answer} probability={probability} />
            :
            (
                <div className="mt0 tl w-100 w-90m w-80 center dark-gray">
                    <StateMessage messageType={messageType} />
                </div>
            )
    )
}

export default MessageBox
