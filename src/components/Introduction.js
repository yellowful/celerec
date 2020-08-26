import React from 'react'
import './Introduction.css'

const Introduction =({onMoreInfo, onClickVideo, displayVideo})=>{
    if(displayVideo===true){
        return( 
            <div className="video"> 
                <iframe width={window.innerWidth} height={window.innerHeight} title="video" src="https://www.youtube.com/embed/excc4ylTMvs?autoplay=1&mute=1&enablejsapi=1" frameborder="0" allowFullScreen> </iframe>
                <button 
                    className="orange tc f5 f4-ns f3-l b br2 w2 w3-l h2 h3-l b pa1 ba b--black bg-dark-blue o-80 absolute top-1 top-2-l right-1 right-2-l grow pointer"
                    onClick={onClickVideo}
                >X</button>                
            </div>
        )
    } else {
        return(
            <div className="flex flex-column justify-start mt2 mt3-ns mh2 mh5-ns">  
                <p className="dark-blue">SmartBrain will tell you who the celebrity in a picture is.</p>
                <button 
                    className="br1 tc f6 w-40 w-25-ns w-10-l b ph3 pv2 ba b--black bg-transparent grow pointer"
                    onClick={onMoreInfo}
                >more info</button>                
            </div>
        )
    }    
}

export default Introduction;