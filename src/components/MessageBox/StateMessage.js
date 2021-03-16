import React from 'react'
import { FormattedMessage } from 'react-intl';

const StateMessage = ({ messageType }) => {

    switch (messageType) {
        case 'prompt':
            return (
                <FormattedMessage
                    id='instruction'
                    defaultMessage="Please input an image URL or upload an image, CeleRec will tell you who the celebrity in a picture is. {linebreak} Give it a try!"
                    values={{ linebreak: <br /> }}
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
                    defaultMessage="The URL is not an image type URL (URL contains .jpg .png...etc.). An image type URL is recommanded for better result rendering. We are caturing the web site, please wait a moment."
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
