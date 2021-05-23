import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'


const LanguageMenu = ({ onSetLanguage }) => {
    //const [isMenuToggled, resetToggled] = useState(false);
    const [isMouseIn, setIsMouseIn] = useState(false);
    const setMouseEnter = () => {
        setIsMouseIn(true);
    }
    const setMouseLeave = () => {
        setIsMouseIn(false);
    }
    const setMouseChange = (e) => {
        e.preventDefault();
        setIsMouseIn(!isMouseIn);
    }
    const setEn = () => {
        onSetLanguage('en');
        setIsMouseIn(false);
    }
    const setZh = () => {
        onSetLanguage('zh');
        setIsMouseIn(false);
    }
    const setEs = () => {
        onSetLanguage('es');
        setIsMouseIn(false);
    }

    return (

        <div className="relative f5 mv3 pb1 pointer bb b--silver bw1 w4 w-50 w-33-m w-20-l" onMouseEnter={setMouseEnter} onMouseLeave={setMouseLeave} onTouchEnd={setMouseChange}>
                {
                    isMouseIn ?
                        (
                            <div className="w-100 flex justify-around">
                                <span className="nowrap">
                                    <FormattedMessage id='change-language' />
                                </span>
                                <span className="w1">
                                    <FontAwesomeIcon icon={faChevronUp} />
                                </span>
                            </div>
                        )
                        :
                        (
                            <div className="w-100 flex justify-around">
                                <span className="nowrap">
                                    <FormattedMessage id='current-language' />
                                </span>
                                <span className="w1">
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </span>
                            </div>
                        )
                }
            {
                isMouseIn ?
                    (
                        <ul className="f5 list shadow-2 mt2 pa1 absolute right-0 bg-dark-gray o-80 w-100">
                            <li
                                key="En"
                                className="pointer mv4 ml4 w3 near-white nowrap"
                                onTouchStart={setEn}
                                onClick={setEn}
                            >
                                English
                            </li>
                            <li
                                key="Zh"
                                className="pointer mv4 ml4 w3 near-white nowrap"
                                onTouchStart={setZh}
                                onClick={setZh}
                            >
                                繁體中文</li>
                            <li
                                key="Es"
                                className="pointer mv4 ml4 w3 near-white nowrap"
                                onTouchStart={setEs}
                                onClick={setEs}
                            >
                                Español</li>
                        </ul>
                    )
                    :
                    null
            }
        </div>
    )
}

export default LanguageMenu;