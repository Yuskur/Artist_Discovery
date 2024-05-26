import React, { useState } from "react";
import './Search.css';

function Search({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className="Search">
            <input 
                type="text" 
                placeholder="Search..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                className="Search-input"
            />
            <button type="submit" className="Search-button">Search</button>
        </form>
    );
}

export default Search;
