import React from 'react';

const SearchBar = ({onSending, onTyping, searchField, currentUsers}) => { 
    return(
        <div className="mt5 tc flex flex-column">
            <p className="tc dark-blue">Hi {currentUsers.name}, your current entry count is {currentUsers.entries}</p>
            <p className="f6 mt1">SmartBrain will tell you who the celebrity in the picture is. Give it a try</p>
            <div className="flex justify-center items-center mh7">
            {/* margin hight */}
                <input type="search" className="fl w5 w-70-l f3-l f6" onChange={onTyping} value={searchField}/>
                <button className="fl w4 tc w-30-l f3-l f6 ml1 pointer" onClick={onSending}>send</button>
            </div>
        </div>        
    )
}

export default SearchBar; 