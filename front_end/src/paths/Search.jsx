import React, { useState } from "react";
import './Search.css';

function Search({ onSearch, setText, setClicked, searchBarRef }) {
    const [query, setQuery] = useState("");

    //this should handle something else but we will deal with this later
    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleChange = (change) => {
        const newQuery = change.target.value
        setQuery(newQuery)
        setText(newQuery)
        onSearch(newQuery);
    } 

    const handleClick = () => {
        setClicked(true)
    }

    return (
        <form onSubmit={handleSearch} className="Search" onClick={handleClick} ref={searchBarRef}>
            <input 
                type="text" 
                placeholder="Search..." 
                value={query} 
                onChange={handleChange} 
                className="Search-input"
            />
            <button type="submit" className="Search-button">Search</button>
        </form>
    );
}

export default Search;
