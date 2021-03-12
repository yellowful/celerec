import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

const LanguageMenu = ({ onSetLanguage }) => {
    //const [isMenuToggled, resetToggled] = useState(false);
    const [isMouseIn, setIsMouseIn] = useState(false);
    const setMouseEnter = () => {
        console.log('before mouse enter', isMouseIn)
        setIsMouseIn(true);
    }
    const setMouseLeave = () => {
        console.log('before mouse leave', isMouseIn)
        setIsMouseIn(false);
    }
    const setMouseChange = (e) => {
        e.preventDefault();
        console.log('before touch',isMouseIn)
        setIsMouseIn(!isMouseIn);
    }

    return (

        <div className="relative mr4 bl b--light-silver" onMouseEnter={setMouseEnter} onMouseLeave={setMouseLeave} onTouchEnd={setMouseChange}>
            <nav className="tr f5 code mh2 mh4-ns mt3 pointer">
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
                        <ul className="f5 list shadow-2 mt1 pa1 absolute right-0 mh2 mr4-ns">
                            <li
                                className="grow pointer mh1 mv3 mh2-ns"
                                onTouchStart={() => {
                                    onSetLanguage('en');
                                    setIsMouseIn(false);
                                }}
                            >
                                English
                            </li>
                            <li
                                className="pointer mh1 mv3 mh2-ns"
                                onTouchStart={() => {
                                    onSetLanguage('zh');
                                    setIsMouseIn(false);
                                }}
                            >
                                繁體中文</li>
                            <li
                                className="pointer  mh1 mv3 mh2-ns"
                                onTouchStart={() => {
                                    onSetLanguage('es');
                                    setIsMouseIn(false);
                                }}
                            >
                                Español</li>
                        </ul>
                    )
                    :
                    null
            }
        </div>
        // :
        // <div className="relative mr4" onMouseEnter={setMouseEnter} onMouseLeave={setMouseLeave} >
        //     <nav className="f5 code mh2 mh4-ns mv3 pointer" >

        //     </nav>
        // </div>
    )
}

export default LanguageMenu;