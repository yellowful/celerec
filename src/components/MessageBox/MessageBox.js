import React from 'react'
import AnswerBox from './AnswerBox'
import StateMessage from './StateMessage'

const MessageBox = ({ answer, probability, messageType }) => {
    return (
        messageType === 'showResult' ?
            <AnswerBox answer={answer} probability={probability} />
            :
            (
                <div className="mt2 tl w-100 w-90m w-80 center dark-gray">
                    <StateMessage messageType={messageType} />
                </div>
            )
    )
}

export default MessageBox
