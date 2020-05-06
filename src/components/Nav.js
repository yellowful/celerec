import React from 'react';

const Nav = ({signInState, onSignOut, onRegister, isRegister}) => {
    if(signInState===true){
        return(
            <div className="flex justify-end">
                <nav className="f5 code mh5 mv3 grow pointer" onClick={onSignOut}>
                {/* code font, max horizontal, max vertical,動畫長大 */}
                    sign out
                </nav>
            </div>
        )
    } else if( isRegister===true){
        return(
            <div className="flex justify-end">
                <nav className="f5 code mh5 mv3 grow pointer" onClick={onSignOut}>
                {/* code font, max horizontal, max vertical,動畫長大 */}
                    sign in
                </nav>
            </div>
        )
    } else {
        return(
            <div className="flex justify-end">
                <nav className="f5 code mh5 mv3 grow pointer" onClick={onSignOut}>
                {/* code font, max horizontal, max vertical,動畫長大 */}
                    sign in
                </nav>
                <nav className="f5 code mh5 mv3 grow pointer" onClick={onRegister}>
                {/* code font, max horizontal, max vertical,動畫長大 */}
                    sign up
                </nav>
            </div>
        )
    }
}

export default Nav;