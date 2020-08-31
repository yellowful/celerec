import React from 'react'

//
const InvalidInput = ({loginError}) => {
    if(loginError===true){
        return(
            <p className="red">Invalid login or register! </p>
        )
    } else {
        return false
    }
}

export default InvalidInput;