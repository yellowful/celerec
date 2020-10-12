import React from 'react';
import ImageUpload from './ImageUpload/ImageUpload.js';
import {FormattedMessage} from 'react-intl';

//搜尋欄位
const SearchBar = ({onSending, searchEnterListener, onTyping, searchField ,currentUsers, onUpload}) => { 
    return(
        <div className="w-90 w-70-m w-60-l tc flex flex-column items-start">
            <h2 className="tl f6 f4-ns f-subheadline-ns dark-blue">
                <FormattedMessage 
                    id="entry"
                    defaultMessage="Hi {name},{linebreak} your current entry count is {entries}"
                    values={{
                        name:currentUsers.name,
                        entries:currentUsers.entries,
                        linebreak:<br />
                    }}
                 />
            </h2> 
            {/* 顯示使用者使用次數        */}
            <div className="flex flex-column items-start w-100 mt1 mt2-ns">        
                <ImageUpload onUpload={onUpload} />
                {/* 上傳相片檔案的按鈕 */}
                    <div className="flex items-start w-100">
                    {/* margin hight */}
                    <FormattedMessage id="placeholder" defaultMessage=" or enter an image URL.">
                        {placeholder =>
                            <input 
                                type="search" 
                                placeholder={placeholder}
                                className="h2 w-60 w-70-m w-80-l f6 f4-ns" 
                                onKeyDown={searchEnterListener}
                                onChange={onTyping}                         
                                value={searchField}
                            />
                        }
                    </FormattedMessage>
                        {/* 搜尋的欄位
                        這裡需要value是因為，送出後，需要把欄位清空 */}
                        <button className="h2 br2-ns tc w-40 w-30-m w-20-l f6 f4-ns ml2 pointer" onClick={onSending}>
                            <FormattedMessage id='send' defaultMessage="Send URL"/>
                        </button>
                        {/* 送出鈕 */}
                    </div>
            </div>
        </div>        
    )
}

export default SearchBar; 