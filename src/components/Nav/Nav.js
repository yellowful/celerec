import React from 'react';
import { FormattedMessage } from 'react-intl';
import LanguageMenu from './LanguageMenu/LanguageMenu';

// 導覽列，要給App用的
// 顯示登入功能和語言切換功能
const Nav = ({ signInState, onSignOut, onRegister, isRegister, onSetLanguage }) => {
    //在搜尋頁面下只需顯示sign out選項
    if (signInState === true) {
        return (
            <nav className="flex justify-end-ns justify-between">
                <div className="f5 code mr2 mr4-ns mv3 pointer bb b--silver bw1 w4 tc" onClick={onSignOut}>
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
                    <FormattedMessage id='sign-in' />
                </div>
                <LanguageMenu onSetLanguage={onSetLanguage} />
            </nav>
        )
    //在sign in頁面，顯示sign up選項
    } else {
        return (
            <nav className="flex justify-end-ns justify-between">
                <div className="f5 mr2 mr4-ns mv3 pb2 pointer bb b--silver bw1 w4 tc" onClick={onRegister}>
                    <FormattedMessage id='sign-up' />
                </div>
                <LanguageMenu onSetLanguage={onSetLanguage} />
            </nav>
        )
    }
}

export default Nav;