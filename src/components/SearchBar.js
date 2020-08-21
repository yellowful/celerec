import React from 'react';
import ImageUpload from './ImageUpload.js';

const SearchBar = ({onSending, onTyping, searchField, currentUsers, onUpload}) => { 
    return(
        <div className="mt1 mt2-ns mt3-m mt4-l tc flex flex-column">
            <h2 className="tc dark-blue">Hi {currentUsers.name}, your current entry count is {currentUsers.entries}</h2>
            {/* <p className="f6 mt1">SmartBrain will tell you who the celebrity in a picture is. Give it a try</p> */}
            <div className="flex flex-column justify-start">        
                <ImageUpload onUpload={onUpload} />
                    <div className="flex justify-center items-center mh2 mh7-ns">
                    {/* margin hight */}
                        <input type="search" placeholder=" or enter an image URL." className="fl w5 w-70-ns f6 f4-ns" onChange={onTyping} value={searchField}/>
                        <button className="fl w4 tc w-30-ns f5-ns f6 f3-ns ml1 pointer" onClick={onSending}>send URL</button>
                    </div>
            </div>
        </div>        
    )
}

export default SearchBar; 