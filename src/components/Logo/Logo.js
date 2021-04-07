import React from 'react';
import Tilt from 'react-tilt'
import HeadLogo from './logo.png'


const Logo = () => {

    return (
        <Tilt className="Tilt" options={{ max: 25 }} style={{ height: 100, width: 100 }}>
            {/* 設定Tilt的大小 */}
            <header className="Tilt-inner w-100 tl ba bw1 br1 br3-ns mt1 shadow-2 grow">
                <img src={HeadLogo} alt="logo" />
            </header>
        </Tilt>
    )
}

export default Logo;