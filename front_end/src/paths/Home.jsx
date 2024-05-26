import React, { useState } from "react";
import Search from "./Search";

const content = [ "This is the Home page"];

 function Home(){
     const [filteredContent, setFilteredContent] = useState(content);

     const handleSearch = (query) => {
         const filtered = content.filter(item => item.toLowerCase().includes(query.toLowerCase()));
         setFilteredContent(filtered);
     };

     return (
         <div>
             <Search onSearch={handleSearch} />
             <div>
                 {filteredContent.map((item, index) => (
                     <p key={index}>{item}</p>
                 ))}
             </div>
         </div>
     );
 }

 export default Home