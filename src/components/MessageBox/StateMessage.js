import React from 'react'
import { FormattedMessage } from 'react-intl';

const StateMessage = ({ messageType }) => {

    switch (messageType) {
        case 'prompt':
            return (
                <FormattedMessage
                    id='instruction'
                    defaultMessage="<code> Please input an image URL or upload an image, CeleRec will tell you who the celebrity in a picture is. </code> <code> Give it a try! </code>"
                    values={{code:(text)=><p>{text}</p>}}
                />
            );
        case 'loading':
            return (
                <FormattedMessage
                    id='loading'
                    defaultMessage="Please wait a moment."
                />
            );
        case 'inputError':
            return (
                <FormattedMessage
                    id='wrong-message'
                    defaultMessage="Sorry, there is something wrong. Please try again."
                />
            )
        case 'capturing':
            return (
                <FormattedMessage
                    id='capturing'
                    defaultMessage=" <code> We are capturing the web site, please wait a moment. </code> <code> By the way, the URL is not an image type URL (URL contains .jpg .png...etc.) </code> <code> An image type URL is recommanded for better result rendering. </code> "
                    values={{code:(text)=><p>{text}</p>}}
                />
            );
        case 'recognizing':
            return (
                <FormattedMessage
                    id='recognizing'
                    defaultMessage="Recognizing the celebrity, please wait a moment."
                />
            );
        case 'fetchError':
            return (
                <FormattedMessage
                    id='fetchError'
                    defaultMessage="Unknown error, please try again."
                />
            );
        case 'captureError':
            return (
                <FormattedMessage
                    id='captureError'
                    defaultMessage="<code>Capturing Error.</code><code>Please try to use image url.</code><code>(URL contains .jpg .png...etc.)</code>"
                    values={{code:(text)=><p>{text}</p>}}
                />
            );
        case 'uploading':
            return (
                <FormattedMessage
                    id='uploading'
                    defaultMessage="Uploading, please wait a moment."
                />
            );
        default:
            return null;
    }
}

export default StateMessage
