import React from 'react';
import { FormattedMessage } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './Credit.css';

//作者資訊
const Credit = () => {
    return (
        <footer>
            <span>
                <FormattedMessage
                    id='credit'
                    defaultMessage="App build by <code>Richard Huang</code>"
                    values={{ code: (text) => <a href="https://www.bdr.rocks/about/#contact" title="蟲探理查">{text}</a> }}
                />
            </span>
            <span className="ml2">
                <a href="https://github.com/yellowful/celerec" title="蟲探理查" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </span>

        </footer>
    )
}

export default Credit;

