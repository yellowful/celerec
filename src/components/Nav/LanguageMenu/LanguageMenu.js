import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

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

        <div className="relative mr2" onMouseEnter={setMouseEnter} onMouseLeave={setMouseLeave} onTouchEnd={setMouseChange}>
            <nav className="tr f5 code mh2 mh4-ns mt3 pointer bb b--silver bw1">
                {
                    isMouseIn ?
                        <FormattedMessage id='change-language' />
                        :
                        <FormattedMessage id='current-language' />
                }
            </nav>
            {
                isMouseIn ?
                    (
                        <ul className="f5 list shadow-2 mt1 pa1 absolute right-0 mh2 mr4-ns bg-gray o-80">
                            <li
                                key="En"
                                className="pointer mh1 mv3 mh2-ns near-white"
                                onTouchStart={setEn}
                                onClick={setEn}
                            >
                                English
                            </li>
                            <li
                                key="Zh"
                                className="pointer mh1 mv3 mh2-ns near-white"
                                onTouchStart={setZh}
                                onClick={setZh}
                            >
                                繁體中文</li>
                            <li
                                key="Es"
                                className="pointer  mh1 mv3 mh2-ns near-white"
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