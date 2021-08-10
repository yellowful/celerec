import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import ImageUpload from './ImageUpload/ImageUpload.js';

// 搜尋欄位，要給App用的
// 包含歡迎訊息和使用次數
const SearchBar = ({ onSending, searchEnterListener, onTyping, searchField, currentUsers, onUpload }) => {
    // onSending是用來執行網址送出後要執行的事情
    // searchEnterListener是用來執行監聽輸入的網址是不是有按enter，按了的話就要做和onSending一樣的事
    // onTyping是用來監聽輸入的網址，如此可以把打的字顯示在搜尋欄上
    // currentUsers有目前使用者的資料，才能用來顯示歡迎訊息和使用次數
    // onUpload是點選上傳檔案後要做的事
    return (
        <section className="w-100 flex flex-column items-start mv2 mt4-ns">
            <h1 className="tl f6 f4-ns fw6 dark-gray mb1 mt4 mb2-ns">
                <FormattedMessage
                    id="hello"
                    defaultMessage="Hi {name},"
                    values={{
                        name: currentUsers.name,
                    }}
                />
            </h1>

            {/* 顯示使用者使用次數        */}
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

            <div className="w-100 flex flex-column flex-row-l">
                <div className="w-100 w-50-l mv1 mv2-ns">
                    {/* 搜尋的欄位
                    這裡需要value是因為，送出後，需要把欄位清空 */}
                    <FormattedMessage id="placeholder" defaultMessage=" or enter an image URL.">
                        {placeholder =>
                            <input
                                type="search"
                                placeholder={placeholder}
                                className="h2 w-100 f6 f5-ns tc tl-ns input-reset bg-light-blue br2"
                                onKeyDown={searchEnterListener}
                                onChange={onTyping}
                                value={searchField}
                            />
                        }
                    </FormattedMessage>
                </div>

                <div className="w-100 w-50-l flex flex-column flex-row-ns justify-between-m justify-around-l items-center mv1 mv2-ns">
                    {/* 送出鈕 */}
                    <button className="h2 tc w-100 w-40-ns f5-ns f6 mb3 mb0-ns pointer button-reset bg-light-blue br2" onClick={onSending}>
                        <FormattedMessage id='send' defaultMessage="Send URL" />
                        {' '}
                        <FontAwesomeIcon icon={faLink} />
                    </button>
                    {/* 上傳相片檔案的按鈕 */}
                    <ImageUpload onUpload={onUpload} />
                </div>
            </div>
        </section>
    )
}

export default SearchBar;