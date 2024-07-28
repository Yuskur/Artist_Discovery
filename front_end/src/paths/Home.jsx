import React, { useState, useEffect } from "react";
import Search from "./Search";
import './Home.css'


 function Home({clicked, setClicked, searchBarRef}){
    //This allows us to take the content by obejct and use it handle the views (also a placeholder for the db return call)
    const content = [ 
        {artist: "Drake", genre: "R&B"}, 
        {artist: "Micheal Jackson", genre: "Hiphop"}, 
        {artist: "AC/DC", genre: "Rock"},
        {artist: "M&M", genre: "R&B"}, 
        {artist: "J-cole", genre: "R&B"}, 
        {artist: "Tyler", genre: "Hiphop/Rap"},
    ];
    const [filteredContent, setFilteredContent] = useState([]);
    const [hasText, setHasText] = useState(false);
    const [hasNone, setHasNone] = useState(false);

    const handleSearch = (query) => {
        const filtered = content.filter(item => item.artist.toLowerCase().includes(query.toLowerCase()));
        const sortedFiltered = filtered.sort((a, b) => {
            const aIndex = a.artist.toLowerCase().indexOf(query.toLowerCase());
            const bIndex = b.artist.toLowerCase().indexOf(query.toLowerCase());
            if (aIndex === 0 && bIndex !== 0) {
                return -1;
            } else if (aIndex !== 0 && bIndex === 0) {
                return 1;
            } else {
                return a.artist.localeCompare(b.artist, 'en', { numeric: true });
            }
        })
        setFilteredContent(sortedFiltered);
        setHasNone(sortedFiltered.length === 0)
    };

    const handleText = (text) => {
        setHasText(text !== "")
    }

    //Ideally should also have an onclick to navigate to an artist page
    function SearchObj({ item }){
        return(
            <div className="search-results">
                <h5>{item.artist}</h5>
            </div>
        );
    }

    return (
        <div className="home-body">
            <div className="Search-bar">
                <Search onSearch={handleSearch} setText={handleText} setClicked={setClicked} searchBarRef={searchBarRef} />
                {hasText && clicked && (
                    <>
                        {hasNone ? (
                            <div className="no-results">
                                No results found
                            </div>
                        ) : (
                        <div className="filteredContent">
                            {filteredContent.slice(0,6).map((item, index) => (
                                <SearchObj key={index} item={item} />
                            ))}
                        </div>
                        )}
                    </>
                )
                }
            </div>
        </div>
    );
 }

 export default Home;
