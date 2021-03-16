import React from 'react'
import { FormattedMessage } from 'react-intl';

const AnswerBox = ({ answer, probability }) => {
    return (
        answer.length > 1 ?
            (
                <div className="flex justify-center mh2">
                    <p className="mt1 dib v-top f7 f5-m f4-l">
                        <FormattedMessage
                            id='plural-answer'
                            defaultMessage="The celebrities are:"
                        />
                    </p>
                    <div className="mt1 dib v-top">
                        {
                            answer.map(((name, index) => {
                                return (
                                    <p key={`${index + 1}. ${name}`} className="dark-blue mv0 pl1 pl2-ns f7 f5-m f4-l">{index + 1}. {name}</p>
                                )
                            }))
                        }
                    </div>
                    {/* 顯示姓名 */}
                    <div className="mt1 dib v-top">
                        {
                            probability.map(((data,index) => {
                                return (
                                    <p key={`${index + 1}. ${data}`} className="dark-blue mv0 pl2 pl4-ns f7 f5-m f4-l">{data}%</p>
                                )
                            }))
                        }
                    </div>
                </div>
            )
            :
            (
                <div className="flex justify-center mh2">
                    <p className="mt1 dib v-top f7 f5-m f4-l">
                    <FormattedMessage 
                        id='single-answer' 
                        defaultMessage="The celebrities is:"                    
                    />
                    </p>
                    <div className="mt1 dib v-top">
                        {
                            answer.map(((name)=>{
                                return(
                                    <p className="dark-blue mv0 pl1 pl2-ns f7 f5-m f4-l">{name}</p>
                                )
                            }))                      
                        }
                        {/* 顯示人名，不顯示序號 */}
                    </div>
                    <div className="mt1 dib v-top">
                        {
                            probability.map(((data)=>{
                                return(
                                    <p className="dark-blue mv0 pl2 pl4-ns f7 f5-m f4-l">{data}%</p>
                                )
                            }))                      
                        }
                        {/* 顯示可能性，不顯示序號 */}
                    </div>
                </div>
            )
    )
}

export default AnswerBox
