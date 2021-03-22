import React from 'react'
import { FormattedMessage } from 'react-intl';

const AnswerBox = ({ answer, probability }) => {
    return (
        <div className="w-100 mt0">
            <p className="mt0 f6 f5-m f4-l tl w-100 w-90m w-80 center dark-gray">
                <FormattedMessage
                    id='answer'
                    defaultMessage="The result of the recognition is:"
                />
            </p>
            <table className="w-100">
                <thead>
                    <tr>
                        {
                            answer.length > 1 ?
                                <th className="tl f6 f5-m f4-l fw4 tc dark-gray ttc">
                                    <FormattedMessage
                                        id='serial'
                                        defaultMessage="serial"
                                    />
                                </th>
                                :
                                null
                        }
                        <th className="tl f6 f5-m f4-l fw4 dark-gray ttc">
                            <FormattedMessage
                                id='celebrity-name'
                                defaultMessage="name"
                            />
                        </th>
                        <th className="tl f6 f5-m f4-l fw4 dark-gray ttc">
                            <FormattedMessage
                                id='probability'
                                defaultMessage="probability"
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        answer.map(((name, index) => {
                            return (
                                <tr key={`${index}-${name}`}>
                                    {
                                        answer.length > 1 ?
                                            <td className="dark-blue f7 f6-m f5-l tc">{index + 1}.</td>
                                            :
                                            null
                                    }
                                    <td className="dark-blue f7 f6-m f5-l ttc">{name}</td>
                                    <td className="dark-blue f7 f6-m f5-l">{probability[index]}%</td>
                                </tr>
                            )
                        }))
                    }
                </tbody>
            </table>
        </div>
        //           )
    )
}

export default AnswerBox
