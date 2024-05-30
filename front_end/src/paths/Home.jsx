import React, { useState } from "react";
import Search from "./Search";
import './Home.css'

const content = [ "Drake", "Micheal Jackson", "AC/DC"];

 function Home(){
     const [filteredContent, setFilteredContent] = useState("");
     const [hasText, setHasText] = useState(false);

     const handleSearch = (query) => {
         const filtered = content.filter(item => item.toLowerCase().includes(query.toLowerCase()));
         setFilteredContent(filtered);
     };

     const handleText = (text) => {
        setHasText(text !== "")
    }

     return (
         <div className="home-body">
            <div className="Search-bar">
                <Search onSearch={handleSearch} setText={handleText} />
                {hasText && (
                    <>
                        {filteredContent.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </>
                 )
                }
             </div>
         </div>
     );
 }

 export default Home