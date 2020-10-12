import React from 'react';
import Tilt from 'react-tilt'
import HeadLogo from './logo.png'


const Logo = () => {
    let tiltHight = 100;
    if(window.innerHeight<600 || window.innerWidth <600){
        tiltHight = 75;
    } else if (window.innerHeight < 800){
        tiltHight = 100;
    } else {
        tiltHight=125;
    }

 //screenshot的尺寸來計算Tilt的大小

    return(
        <Tilt className="Tilt" options={{ max : 25 }} style={{ height: tiltHight, width: tiltHight}}>
        {/* 設定Tilt的大小 */}
            <div className="Tilt-inner">
                <div id="logo" className="f5 ba bw1 br1 br2-ns br3-m flex justify-center items-center pa1 w-100 h-100 ml3 ml5-ns mt1 shadow-2 grow">
                {/* logo的圖檔 */}
                    <img src={HeadLogo} alt="logo"/>
                </div>
            </div>
        </Tilt>
    )
}

export default Logo;