import React, { useState } from "react";
import Search from "./Search";

const content = [ "This is the Home page", "This is another page"];

 function Home(){
     const [filteredContent, setFilteredContent] = useState(content);

     const handleSearch = (query) => {
         const filtered = content.filter(item => item.toLowerCase().includes(query.toLowerCase()));
         setFilteredContent(filtered);
     };

     return (
         <div className="home-body">
            <div>
                <Search onSearch={handleSearch} />
            </div>
            <div>
                 {filteredContent.map((item, index) => (
                     <p key={index}>{item}</p>
                 ))}
            </div>
         </div>
     );
 }

 export default Home