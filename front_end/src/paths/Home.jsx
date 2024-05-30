import React, { useState } from "react";
import Search from "./Search";
import './Home.css'

//This allows us to take the content by obejct and use it handle the views
const content = [ 
    {artist: "Drake", genre: "R&B"}, 
    {artist: "Micheal Jackson", genre: "Hiphop"}, 
    {artist: "AC/DC", genre: "Rock"},
    {artist: "M&M", genre: "R&B"}, 
    {artist: "J-cole", genre: "R&B"}, 
    {artist: "Tyler", genre: "Hiphop/Rap"}
];

 function Home(){
     const [filteredContent, setFilteredContent] = useState([]);
     const [hasText, setHasText] = useState(false);

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
     };

     const handleText = (text) => {
        setHasText(text !== "")
    }

    function Vote(){
        return(
            <div className="vote">
                Vote who you feel artist should be recognized
            </div>
        )
    }

    //Ideally should also have an onclick to navigate to an artist page
    function SearchObj({item, index}){
        
        return(
            <div className="search-results">
                <h5 key={index}>{item.artist}</h5>
            </div>
        );
    }

     return (
         <div className="home-body">
            <div className="Search-bar">
                <Search onSearch={handleSearch} setText={handleText} />
                {hasText && (
                    <div className="filteredContent">
                        {filteredContent.map((item, index) => (
                            <SearchObj item={item} index={index} />
                        ))}
                    </div>
                 )
                }
             </div>
             <Vote />
         </div>
     );
 }

 export default Home