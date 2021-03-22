import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ImageUpload from './ImageUpload/ImageUpload.js';

//搜尋欄位
const SearchBar = ({ onSending, searchEnterListener, onTyping, searchField, currentUsers, onUpload }) => {
    return (
        <div className="w-100 flex flex-column items-start mv2 mt4-ns">
            <h1 className="tl f6 f4-ns fw6 dark-gray mb1 mt4 mb2-ns">
                <FormattedMessage
                    id="hello"
                    defaultMessage="Hi {name},"
                    values={{
                        name: currentUsers.name,
                    }}
                />
            </h1>

            <p className="tl f6 f4-ns fw4 dark-gray mt1 mb4 mt2-ns">
                <span>
                    <FormattedMessage
                        id="entry"
                        defaultMessage="your current entry count is"
                    />
                </span>
                <span className="dark-blue b">
                    {currentUsers.entries}
                </span>
            </p>

            {/* 顯示使用者使用次數        */}
            <div className="w-100 flex flex-column flex-row-l">
                <div className="w-100 w-50-l mv1 mv2-ns">
                    {/* margin hight */}
                    <FormattedMessage id="placeholder" defaultMessage=" or enter an image URL.">
                        {placeholder =>
                            <input
                                type="search"
                                placeholder={placeholder}
                                className="h2 w-100 f6 f5-ns tc tl-ns input-reset bg-near-white br2"
                                onKeyDown={searchEnterListener}
                                onChange={onTyping}
                                value={searchField}
                            />
                        }
                    </FormattedMessage>
                </div>
                {/* 搜尋的欄位
                        這裡需要value是因為，送出後，需要把欄位清空 */}
                <div className="w-100 w-50-l flex flex-column flex-row-ns justify-between-m justify-around-l items-center mv1 mv2-ns">
                    <button className="h2 tc w-100 w-40-ns f5-ns f6 mb3 mb0-ns pointer button-reset bg-near-white br2" onClick={onSending}>
                        <FormattedMessage id='send' defaultMessage="Send URL" />
                    </button>
                    {/* 送出鈕 */}
                    <ImageUpload onUpload={onUpload} />
                    {/* 上傳相片檔案的按鈕 */}
                </div>
            </div>
        </div>
    )
}

export default SearchBar;