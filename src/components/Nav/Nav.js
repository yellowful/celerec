import React from 'react';
import {FormattedMessage} from 'react-intl';
import LanguageMenu from './LanguageMenu/LanguageMenu';

//右上導覽列
const Nav = ({signInState, onSignOut, onRegister, isRegister, onSetLanguage}) => {
    //在搜尋頁面下只需顯示sign out選項
    if(signInState===true){
        return(
            <div className="flex justify-end">
                <nav className="f5 code mh3 mh4-ns mv3 pointer bb b--silver bw1" onClick={onSignOut}>
                {/* code font, max horizontal, max vertical,動畫長大 */}
                <FormattedMessage id='sign-out' />
                </nav>
                <LanguageMenu onSetLanguage={onSetLanguage}/>
            </div>
        )
    //在註冊頁面，只需顯示sign in的選項
    } else if( isRegister===true){
        return(
            <div className="flex justify-end">
                <nav className="f5 code mh2 mh4-ns mv3 pointer bb b--silver bw1" onClick={onSignOut}>
                {/* code font, max horizontal, max vertical,動畫長大 */}
                    <FormattedMessage id='sign-in' />
                </nav>
                <LanguageMenu onSetLanguage={onSetLanguage}/>
            </div>
        )
    //在sign in頁面，顯示sign in和sign out
    } else {
        return(
            <div className="flex justify-end">
                {/* <nav className="f6 f4-ns code mh3 mh4-ns mv3 grow pointer" onClick={onSignOut}>
                code font, max horizontal, max vertical,動畫長大
                <FormattedMessage id='sign-in' />
                </nav> */}
                <nav className="f5 code mh2 mh4-ns mv3 pointer bb b--silver bw1" onClick={onRegister}>
                {/* code font, max horizontal, max vertical,動畫長大 */}
                <FormattedMessage id='sign-up' />
                </nav>
                <LanguageMenu onSetLanguage={onSetLanguage}/>
            </div>
        )
    }
}

export default Nav;