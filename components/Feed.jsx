"use client";

import { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
   const [ searchText, setSearchText ] = useState("");
   const [ allPosts, setAllPosts ] = useState([]);
   const [ searchedResults, setSearchedResults ] = useState([]);

   const handleTagClick = () => {}

   const handleSearchChange = (e) => {
      e.preventDefault();
      setSearchText(e.target.value);
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
   }

   const filterPrompts = (searchtext) => {
      const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
      return allPosts.filter(
        (item) =>
          regex.test(item.creator.username) ||
          regex.test(item.tag) ||
          regex.test(item.prompt)
      );
    };

   useEffect(() => {
      const fetchPosts = async() => {
         const response = await fetch('/api/prompt');
         const data = await response.json();
         setAllPosts(data);
      }
      fetchPosts();
   }, []);

   return (
      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            type="text" 
            value={searchText}
            placeholder="Search for a tag or a username"
            required
            className="search_input peer"
            onChange={handleSearchChange}
           />
        </form>

        {/* All Prompts */}
        {
          searchText ? (  
             <PromptCardList 
              data={ searchedResults }
              handleTagClick={handleTagClick}
             />
             ) : (
               <PromptCardList 
                  data={ allPosts }
                  handleTagClick={handleTagClick}
              />
             )
        }
      </section>
   )
};

export default Feed;
