import React from 'react';
import { FormattedMessage } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

//作者資訊
const Credit = () => {
    return (
        <footer className="tr w-100 tr fw1 f6 mv2 mv4-ns">
            <span>
                <FormattedMessage
                    id='credit'
                    defaultMessage="App build by <code>Richard Huang</code>"
                    values={{ code: (text) => <a className="no-underline pointer grow dark-blue" href="https://www.bdr.rocks/about/#contact" title="蟲探理查">{text}</a> }}
                />
            </span>
            <span className="ml2">
                <a className="no-underline pointer grow dark-blue" href="https://github.com/yellowful/celerec" title="蟲探理查" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </span>

        </footer>
    )
}

export default Credit;

