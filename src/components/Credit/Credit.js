import React from 'react';
import {FormattedMessage} from 'react-intl'
import './Credit.css';

//作者資訊
const Credit = () => {
    return(
        <div>
            <FormattedMessage
                id='credit'
                defaultMessage="App build by <code>Richard Huang</code>"
                values={{code:(text)=><a  href="https://www.bdr.rocks/about/#contact" title="蟲探理查">{text}</a>}}
            />
        </div>
    )
}

export default Credit;

