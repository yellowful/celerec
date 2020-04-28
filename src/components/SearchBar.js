import React from 'react';

const SearchBar = ({onSending, onTyping}) => {
    return(
        <div className="mt5 tc flex flex-column">
            <h3>give it a try</h3>
            <div className="flex justify-center items-center mh7">
                <input type="search" className="fl w-70" onChange={onTyping}/>
                <button className="fl w-30 tc" onClick={onSending}>send</button>
            </div>
        </div>
        
    )
}

export default SearchBar; 