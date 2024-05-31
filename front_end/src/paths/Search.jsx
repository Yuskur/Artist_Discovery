import React, { useState } from "react";
import './Search.css';

function Search({ onSearch, setText }) {
    const [query, setQuery] = useState("");

    //this should handle something else but we will deal with this later
    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleChange = (change) => {
        setQuery(change.target.value)
        setText(change.target.value)
        onSearch(query);
    } 

    return (
        <form onSubmit={handleSearch} className="Search">
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
