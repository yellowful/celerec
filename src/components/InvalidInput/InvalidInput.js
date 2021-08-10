import React from 'react'
import { FormattedMessage } from 'react-intl'

// 要給FormSubmit用的
// 當有錯誤訊息時要顯示錯誤訊息
const InvalidInput = ({loginError}) => {
    if(loginError===true){
        return(
            <p className="red">
                <FormattedMessage id='invalid' />
            </p>
        )
    } else {
        return false
    }
}

export default InvalidInput;