import React from 'react';
import Tilt from 'react-tilt'
import HeadLogo from './logo.png'


const Logo = () => {
    let tiltHight = 100;
    if(window.screen.height<600 || window.screen.width <600){
        tiltHight = 100;
    } else if (window.screen.heigit < 800){
        tiltHight = 150;
    } else {
        tiltHight=250
    }

    return(
        <Tilt className="Tilt" options={{ max : 25 }} style={{ height: tiltHight, width: 250}}>
            <div className="Tilt-inner">
                <div id="logo" className="f5 ba bw1 br1 br2-ns br3-m flex justify-center items-center pa1 w-20 w-30-ns w-40-m w-50-l h-20 h-30-ns h-40-m h-50-l ml3 ml4-ns mt2 shadow-2 grow f2-l">
                    <img src={HeadLogo} alt="logo"/>
                </div>
            </div>
        </Tilt>
    )
}

export default Logo;