import React from 'react';

const SearchBar = ({onSending, onTyping, searchField}) => { 
    return(
        <div className="mt5 tc flex flex-column">
            <h3>give it a try</h3>
            <div className="flex justify-center items-center mh7">
            {/* margin hight */}
                <input type="search" className="fl w5 w-70-l f3-l f6" onChange={onTyping} value={searchField}/>
                <button className="fl w4 tc w-30-l f3-l f6 ml1 pointer" onClick={onSending}>send</button>
            </div>
        </div>        
    )
}

export default SearchBar; 