import React from 'react';
import ImageUpload from './ImageUpload/ImageUpload.js';

//搜尋欄位
const SearchBar = ({onSending, searchEnterListener, onTyping, searchField ,currentUsers, onUpload}) => { 
    return(
        <div className="mt1 mt2-ns mt3-m mt4-l tc flex flex-column">
            <h2 className="tc dark-blue">Hi {currentUsers.name}, your current entry count is {currentUsers.entries}</h2> 
            {/* 顯示使用者使用次數        */}
            <div className="flex flex-column justify-start">        
                <ImageUpload onUpload={onUpload} />
                {/* 上傳相片檔案的按鈕 */}
                    <div className="flex justify-center items-center mh2 mh7-ns">
                    {/* margin hight */}
                        <input 
                            type="search" 
                            placeholder=" or enter an image URL." 
                            className="fl w5 w-70-ns f6 f4-ns" 
                            onKeyDown={searchEnterListener}
                            onChange={onTyping}                         
                            value={searchField}
                        />
                        {/* 搜尋的欄位
                        這裡需要value是因為，送出後，需要把欄位清空 */}
                        <button className="fl w4 tc w-30-ns f5-ns f6 f3-ns ml1 pointer" onClick={onSending}>send URL</button>
                        {/* 送出鈕 */}
                    </div>
            </div>
        </div>        
    )
}

export default SearchBar; 