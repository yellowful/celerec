import React from 'react';

//右上導覽列
const Nav = ({signInState, onSignOut, onRegister, isRegister}) => {
    //在搜尋頁面下只需顯示sign out選項
    if(signInState===true){
        return(
            <div className="flex justify-end">
                <nav className="f6 f4-ns code mh3 mh4-ns mv3 grow pointer" onClick={onSignOut}>
                {/* code font, max horizontal, max vertical,動畫長大 */}
                    sign out
                </nav>
            </div>
        )
    //在註冊頁面，只需顯示sign in的選項
    } else if( isRegister===true){
        return(
            <div className="flex justify-end">
                <nav className="f6 f4-ns code mh2 mh4-ns mv3 grow pointer" onClick={onSignOut}>
                {/* code font, max horizontal, max vertical,動畫長大 */}
                    sign in
                </nav>
            </div>
        )
    //在sign in頁面，顯示sign in和sign out
    } else {
        return(
            <div className="flex justify-end">
                <nav className="f6 f4-ns code mh3 mh4-ns mv3 grow pointer" onClick={onSignOut}>
                {/* code font, max horizontal, max vertical,動畫長大 */}
                    sign in
                </nav>
                <nav className="f6 f4-ns code mh2 mh4-ns mv3 grow pointer" onClick={onRegister}>
                {/* code font, max horizontal, max vertical,動畫長大 */}
                    sign up
                </nav>
            </div>
        )
    }
}

export default Nav;