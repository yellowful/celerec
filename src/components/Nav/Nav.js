import React from 'react';
import { FormattedMessage } from 'react-intl';
import LanguageMenu from './LanguageMenu/LanguageMenu';

//右上導覽列
const Nav = ({ signInState, onSignOut, onRegister, isRegister, onSetLanguage }) => {
    //在搜尋頁面下只需顯示sign out選項
    if (signInState === true) {
        return (
            <nav className="flex justify-end-ns justify-between">
                <div className="f5 code mr2 mr4-ns mv3 pointer bb b--silver bw1 w4 tc" onClick={onSignOut}>
                    {/* code font, max horizontal, max vertical,動畫長大 */}
                    <FormattedMessage id='sign-out' />
                </div>
                <LanguageMenu onSetLanguage={onSetLanguage} />
            </nav>
        )
        //在註冊頁面，只需顯示sign in的選項
    } else if (isRegister === true) {
        return (
            <nav className="flex justify-end-ns justify-between">
                <div className="f5 mr2 mr4-ns mv3 pb1 pointer bb b--silver bw1 w4 tc" onClick={onSignOut}>
                    {/* code font, max horizontal, max vertical,動畫長大 */}
                    <FormattedMessage id='sign-in' />
                </div>
                <LanguageMenu onSetLanguage={onSetLanguage} />
            </nav>
        )
        //在sign in頁面，顯示sign in和sign out
    } else {
        return (
            <nav className="flex justify-end-ns justify-between">
                {/* <nav className="f6 f4-ns code mh3 mh4-ns mv3 grow pointer" onClick={onSignOut}>
                code font, max horizontal, max vertical,動畫長大
                <FormattedMessage id='sign-in' />
                </nav> */}
                <div className="f5 mr2 mr4-ns mv3 pb1 pointer bb b--silver bw1 w4 tc" onClick={onRegister}>
                    {/* code font, max horizontal, max vertical,動畫長大 */}
                    <FormattedMessage id='sign-up' />
                </div>
                <LanguageMenu onSetLanguage={onSetLanguage} />
            </nav>
        )
    }
}

export default Nav;