import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

// 要給Nav用的
// 讓使用者可以更改自己要的語言
const LanguageMenu = ({ onSetLanguage }) => {
    // 讓dropdown有hover的功能，記得滑鼠是否滑入
    const [isMouseIn, setIsMouseIn] = useState(false);
    // 設定滑鼠為滑入的狀態，給桌面版用的
    const setMouseEnter = () => {
        setIsMouseIn(true);
    }
    // 設定滑鼠為離開的狀態，給桌面版用的
    const setMouseLeave = () => {
        setIsMouseIn(false);
    }
    // 設定滑鼠狀態相反，給手機用的
    const setMouseChange = (e) => {
        e.preventDefault();
        setIsMouseIn(!isMouseIn);
    }
    // 設定翻譯為英語
    const setEn = () => {
        onSetLanguage('en');
        // 點擊英語後，dropdown應該要收起來
        setIsMouseIn(false);
    }
    // 設定翻譯為中文
    const setZh = () => {
        onSetLanguage('zh');
        // 點擊中文後，dropdown應該要收起來
        setIsMouseIn(false);
    }
    // 設定翻譯為西語
    const setEs = () => {
        onSetLanguage('es');
        // 點擊西語後，dropdown應該要收起來
        setIsMouseIn(false);
    }

    return (

        <div className="relative f5 mv3 pb2 pointer bb b--silver bw1 w4 w-50 w-33-m w-20-l" onMouseEnter={setMouseEnter} onMouseLeave={setMouseLeave} onTouchEnd={setMouseChange}>
                {
                    // 滑鼠是在dropdown裡面的話，Nav上就就顯示改變語言的選項可以點
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
                // 如果滑鼠是在dropdown裡面的話，就要顯示dropdown menu
                // 如果不是的話，就什麼都不顯示
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